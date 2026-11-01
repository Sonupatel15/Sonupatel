import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";
import { footerSocialLinks, journalMilestones, resume } from "../src/content/profile.ts";

function javascriptAssets(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return javascriptAssets(path);
    }
    return /\.(?:m?js)$/.test(entry.name) ? [path] : [];
  });
}

assert.ok(existsSync("out"), "Build the site before validating its output.");
assert.ok(!existsSync(join("out", "_next")), "Stale Next.js output must not be published.");
const externalScriptBytes = javascriptAssets("out").reduce(
  (bytes, path) => bytes + gzipSync(readFileSync(path)).length,
  0,
);

function postRoutes(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory()) return [];
    const path = join(directory, entry.name);
    return [...(existsSync(join(path, "index.html")) ? [path] : []), ...postRoutes(path)];
  });
}
const routes = ["", "about", "projects", "contact", "resume", "posts", "journal", ...["posts", "journal"].flatMap((section) => postRoutes(join("out", section)).map((path) => relative("out", path)))];
for (const route of routes) {
  const path = join("out", route, "index.html");
  assert.ok(existsSync(path), `Missing static page: ${path}`);
  const html = readFileSync(path, "utf8");
  assert.doesNotMatch(html, /\/_next\/|<astro-island\b/, `Unexpected framework runtime: ${path}`);
  for (const [, attributes, content] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    if (attributes.includes(`href="${resume.href}"`) && /\bdownload\b/.test(attributes)) {
      assert.ok(content.includes(resume.downloadLabel), `Use the approved PDF action label: ${path}`);
    }
  }
  assert.doesNotMatch(html, /previous version|previous-version|previously supplied PDF|Download previous/, `Removed archive wording remains: ${path}`);
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/);
  assert.ok(footer, `Missing footer: ${path}`);
  assert.deepEqual(
    [...footer[1].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]),
    footerSocialLinks.map((link) => link.href),
    `Footer must contain only GitHub, LinkedIn, and X: ${path}`,
  );
  if (route === "projects") assert.doesNotMatch(html, /No public repository is linked/);
  if (route === "journal") {
    assert.doesNotMatch(html, /Beyond the profile|Milestones from my work, education and writing|Published: Personal Finance Guide/);
    let previous = -1;
    for (const milestone of journalMilestones) {
      const position = html.indexOf(`id="${milestone.id}"`);
      assert.ok(position > previous, `Missing or out-of-order Journal milestone: ${milestone.id}`);
      previous = position;
    }
  }
  if (route === "contact") {
    const grid = html.match(/<ul\b[^>]*class="profile-grid"[^>]*>([\s\S]*?)<\/ul>/);
    assert.ok(grid, "Contact profile cards are missing.");
    const links = [...grid[1].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(links.slice(0, 2), [
      "https://www.linkedin.com/in/sonupatel-a-l/",
      "https://github.com/Sonupatel15",
    ], "Contact must show LinkedIn and GitHub first.");
  }
  const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => !/\bsrc\s*=/.test(match[1]))
    .map((match) => match[2])
    .join("\n");
  const scriptBytes = externalScriptBytes +
    (inlineScripts ? gzipSync(Buffer.from(inlineScripts)).length : 0);
  assert.ok(scriptBytes < 100000, `Initial gzip JavaScript budget exceeded: ${path} (${scriptBytes} bytes)`);
  console.log(JSON.stringify({
    route: `/${route.replaceAll("\\", "/")}${route ? "/" : ""}`,
    upperBoundInitialGzipJavaScriptBytes: scriptBytes,
    budgetBytes: 100000,
  }));
}

for (const filename of ["404.html", "icon.svg", "_headers", "licenses/bootstrap-icons.txt", "licenses/simple-icons.txt"]) {
  assert.ok(existsSync(join("out", filename)), `Missing static asset: ${filename}`);
}

for (const image of [
  { filename: "headshot-256.webp", maxBytes: 90000 },
  { filename: "headshot-512.webp", maxBytes: 90000 },
  { filename: "personal-finance.webp", maxBytes: 90000 },
]) {
  const path = join("out", "images", image.filename);
  assert.ok(existsSync(path), `Missing responsive photo: ${path}`);
  const bytes = readFileSync(path).length;
  assert.ok(bytes > 0 && bytes <= image.maxBytes, `Photo size budget exceeded: ${path}`);
  if (image.filename === "personal-finance.webp") {
    const data = readFileSync(path);
    assert.equal(data.toString("ascii", 8, 12), "WEBP", "Article image must be WebP.");
    for (let offset = 12; offset + 8 <= data.length;) {
      const type = data.toString("ascii", offset, offset + 4);
      const length = data.readUInt32LE(offset + 4);
      assert.ok(!["EXIF", "XMP "].includes(type), "Article image must not contain metadata.");
      offset += 8 + length + (length % 2);
      assert.ok(offset <= data.length, "Article WebP chunk exceeds file bounds.");
    }
  }
}

const pdf = readFileSync(join("out", resume.fileName));
assert.equal(pdf.subarray(0, 5).toString(), "%PDF-", "Resume is not a PDF.");
assert.ok(pdf.length < 500000, "The original PDF exceeds the 500 KB resume budget.");
assert.equal(
  createHash("sha256").update(pdf).digest("hex"),
  resume.sha256,
  "The PDF no longer matches the owner-approved original.",
);
console.log("Static pages, complete JavaScript upper bounds, photo budgets, and original resume verified.");
