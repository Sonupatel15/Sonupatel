export type ThemePreference = "system" | "light" | "dark";

export const themeStorageKey = "sonupatel-theme";

export const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function isStorageUnavailable(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "SecurityError" || error.name === "QuotaExceededError")
  );
}

export function getThemePreference(): ThemePreference {
  const value = document.documentElement.dataset.theme;
  if (isThemePreference(value)) {
    return value;
  }
  if (value !== undefined) {
    console.warn("Invalid document theme preference. Using system colors.");
  }
  return "system";
}

export function getServerThemePreference(): ThemePreference {
  return "system";
}

export function restoreSavedThemePreference(): void {
  let preference: ThemePreference = "system";
  try {
    const saved = window.localStorage.getItem(themeStorageKey);
    if (isThemePreference(saved)) {
      preference = saved;
    } else if (saved !== null) {
      console.warn("Invalid saved theme preference. Using system colors.");
    }
  } catch (error) {
    if (!isStorageUnavailable(error)) {
      throw error;
    }
    console.warn("Theme storage is unavailable. Using system colors.", error);
  }
  document.documentElement.dataset.theme = preference;
}

export function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  function onStorage(event: StorageEvent) {
    if (event.key !== themeStorageKey && event.key !== null) {
      return;
    }

    const value = event.key === null ? null : event.newValue;
    if (value !== null && !isThemePreference(value)) {
      console.warn("Invalid saved theme preference. Using system colors.");
    }
    document.documentElement.dataset.theme = isThemePreference(value)
      ? value
      : "system";
  }

  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

export function saveThemePreference(preference: ThemePreference): boolean {
  document.documentElement.dataset.theme = preference;

  try {
    if (preference === "system") {
      window.localStorage.removeItem(themeStorageKey);
    } else {
      window.localStorage.setItem(themeStorageKey, preference);
    }
    return true;
  } catch (error) {
    if (!isStorageUnavailable(error)) {
      throw error;
    }
    console.warn("Theme changed, but browser storage is unavailable.", error);
    return false;
  }
}

// Runs in the document head so saved colors apply before interactive controls load.
export const themeInitializationScript = `
(() => {
  let preference = "system";
  try {
    const saved = window.localStorage.getItem(${JSON.stringify(themeStorageKey)});
    if (${JSON.stringify(themeOptions.map((option) => option.value))}.includes(saved)) {
      preference = saved;
    } else if (saved !== null) {
      console.warn("Invalid saved theme preference. Using system colors.");
    }
  } catch (error) {
    if (!(error instanceof DOMException) ||
        (error.name !== "SecurityError" && error.name !== "QuotaExceededError")) {
      throw error;
    }
    console.warn("Theme storage is unavailable. Using system colors.", error);
  }
  document.documentElement.dataset.theme = preference;
})();
`;
