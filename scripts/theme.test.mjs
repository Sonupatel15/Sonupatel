import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import {
  getServerThemePreference,
  isThemePreference,
  themeInitializationScript,
  themeStorageKey,
} from "../src/lib/theme.ts";

function initialize(saved, failure) {
  const dataset = { theme: "system" };
  const warnings = [];
  runInNewContext(themeInitializationScript, {
    window: {
      localStorage: {
        getItem(key) {
          assert.equal(key, themeStorageKey);
          if (failure) {
            throw failure;
          }
          return saved;
        },
      },
    },
    document: { documentElement: { dataset } },
    DOMException,
    console: { warn: (...arguments_) => warnings.push(arguments_) },
  });
  return { dataset, warnings };
}

test("accepts only the three supported theme preferences", () => {
  for (const value of ["system", "light", "dark"]) {
    assert.equal(isThemePreference(value), true);
  }
  for (const value of [null, undefined, "", "LIGHT", "sepia", {}, ["dark"]]) {
    assert.equal(isThemePreference(value), false);
  }
});

test("server rendering defaults to the system preference without browser APIs", () => {
  assert.equal(getServerThemePreference(), "system");
});

test("initialization applies saved preferences before interactive controls load", () => {
  for (const value of ["light", "dark", "system"]) {
    const result = initialize(value);
    assert.equal(result.dataset.theme, value);
    assert.equal(result.warnings.length, 0);
  }
});

test("a missing preference keeps system colors without an error", () => {
  const result = initialize(null);
  assert.equal(result.dataset.theme, "system");
  assert.equal(result.warnings.length, 0);
});

test("an invalid saved preference is reported and uses system colors", () => {
  const result = initialize("sepia");
  assert.equal(result.dataset.theme, "system");
  assert.equal(result.warnings.length, 1);
});

test("expected browser storage failures are reported without breaking initialization", () => {
  for (const name of ["SecurityError", "QuotaExceededError"]) {
    const result = initialize(null, new DOMException("Storage blocked", name));
    assert.equal(result.dataset.theme, "system");
    assert.equal(result.warnings.length, 1);
  }
});

test("unexpected initialization failures are not swallowed", () => {
  assert.throws(() => initialize(null, new TypeError("Unexpected failure")), TypeError);
});
