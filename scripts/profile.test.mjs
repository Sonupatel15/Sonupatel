import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import {
  currentRole,
  educationHistory,
  experience,
  profile,
  projects,
  resume,
  skills,
  socialLinks,
  footerSocialLinks,
  journalMilestones,
} from "../src/content/profile.ts";

test("uses the owner's corrected identity and current role, not the example profile", () => {
  assert.equal(profile.name, "Sonupatel A L");
  assert.equal(currentRole.title, "Associate Software Engineer");
  assert.equal(currentRole.company, "Flexera");
  assert.match(profile.introduction, /backend services, PostgreSQL high availability and microservices/);
  assert.doesNotMatch(profile.introduction, /Anshuman|FinOps/);
});

test("keeps only GitHub, LinkedIn and X in the footer without changing Contact profiles", () => {
  assert.deepEqual(footerSocialLinks.map((link) => link.icon), ["github", "linkedin", "x"]);
  assert.equal(socialLinks.length, 9);
});

test("orders eleven milestones newest first, including both internship completions", () => {
  assert.deepEqual(journalMilestones.map((milestone) => [milestone.id, milestone.date.value]), [
    ["flexera-rookie-of-the-year", "2026-08"],
    ["joined-flexera", "2025-08"],
    ["completed-ribbon", "2025-07"],
    ["completed-pes-university", "2025-05"],
    ["joined-ribbon", "2025-04"],
    ["completed-hal", "2024-07"],
    ["joined-hal", "2024-06"],
    ["inter-department-kabaddi", "2024-04"],
    ["joined-pes-university", "2021-12"],
    ["completed-jnanasudha-pu-college", "2021-07"],
    ["completed-aradhana-school", "2019-03"],
  ]);
  const puc = journalMilestones.find((milestone) => milestone.id === "completed-jnanasudha-pu-college");
  assert.ok(puc.details.includes("CET Engineering rank: 501"));
  assert.ok(puc.details.includes("JEE Main: 97.36 percentile"));
  assert.ok(!journalMilestones.some((milestone) => milestone.title.startsWith("Published:")));
  assert.equal(educationHistory.find((education) => education.id === "pes-university").start.label, "Dec 2021");
  assert.equal(currentRole.start.label, "Aug 2025");
  for (const id of ["hal", "ribbon"]) {
    const completion = journalMilestones.find((milestone) => milestone.id === `completed-${id}`);
    const role = experience.find((role) => role.id === id);
    assert.equal(completion.date.value, role.end.value);
    assert.equal(completion.title, `Completed ${role.company} internship`);
  }
  assert.ok(!journalMilestones.some((milestone) => milestone.id === "completed-flexera"));
});

test("retains the full authorized finance article with all ten sections and a local image", () => {
  const article = readFileSync(new URL("../src/content/posts/personal-finance-guide.md", import.meta.url), "utf8");
  assert.equal([...article.matchAll(/^## \d+\./gm)].length, 10);
  assert.match(article, /Short-term \(1 to 3 years\)/);
  assert.match(article, /Keep credit utilization below 30%/);
  assert.match(article, /80CCD\(1B\)/);
  assert.match(article, /src="\/images\/personal-finance.webp" width="626" height="469"/);
  assert.match(article, /https:\/\/sonupatelal.substack.com\/p\/personal-finance-guide-for-beginners/);
  assert.doesNotMatch(article, /This page provides an overview/);
});

test("includes owner-confirmed HAL RTOS work and only the retained Ribbon AWS work", () => {
  const hal = experience.find((role) => role.company === "Hindustan Aeronautics Limited");
  assert.ok(hal);
  assert.equal(hal.title, "Summer Intern");
  assert.equal(hal.start.value, "2024-06");
  assert.equal(hal.end.value, "2024-07");
  assert.equal(hal.arrangement, "On-site");
  assert.deepEqual(hal.responsibilities, ["Worked on real-time operating systems (RTOS)."]);
  const ribbon = experience.find((role) => role.company === "Ribbon Communications");
  assert.ok(ribbon);
  assert.equal(ribbon.responsibilities.length, 1);
  assert.match(ribbon.responsibilities[0], /AWS cloud infrastructure/);
  assert.doesNotMatch(JSON.stringify(ribbon), /public cloud|Java|Spring Boot/);
  assert.match(currentRole.summary, /Go and Java/);
});

test("retains the owner-provided degree, PUC, and CBSE education facts", () => {
  assert.equal(educationHistory.length, 3);
  const degree = educationHistory.find((education) => education.id === "pes-university");
  const puc = educationHistory.find((education) => education.id === "jnanasudha-pu-college");
  const school = educationHistory.find((education) => education.id === "aradhana-school");
  assert.equal(degree.end.value, "2025-05");
  assert.ok(puc.details.includes("Board examination: 98.5%"));
  assert.ok(puc.details.includes("JEE Main: 97.36 percentile"));
  assert.ok(puc.details.includes("CET Engineering rank: 501"));
  assert.ok(school.details.includes("Board examination: 95.4%"));
});

test("uses the requested skills and filtered public profiles", () => {
  const languages = skills.find((group) => group.category === "Languages").items;
  assert.ok(languages.includes("Rust") && languages.includes("TypeScript"));
  assert.ok(!languages.includes("HTML") && !languages.includes("CSS"));
  assert.ok(skills.find((group) => group.category === "Backend and web").items.includes("Gin"));
  assert.deepEqual(skills.find((group) => group.category === "Infrastructure and tools").items, ["Docker", "AWS", "Kubernetes"]);
  assert.ok(!skills.find((group) => group.category === "Databases and caching").items.includes("SQL"));
  assert.equal(socialLinks.length, 9);
  assert.equal(new Set(socialLinks.map((link) => link.href)).size, 9);
  assert.ok(!socialLinks.some((link) => ["Credly", "Kaggle", "GeeksforGeeks"].includes(link.label)));
  assert.equal(new Set(socialLinks.map((link) => link.icon)).size, 9);
  assert.ok(socialLinks.every((link) => link.icon));
});

test("retains the analyzer project and uses the owner's simple PDF download label", () => {
  assert.equal(projects.length, 4);
  const analyzer = projects.find((project) => project.id === "linkedin-profile-analyzer");
  assert.ok(analyzer);
  assert.equal(analyzer.links[0].href, "https://github.com/Sonupatel15/Linkedin-Profile-Scrapper");
  assert.ok(analyzer.technologies.includes("Streamlit") && analyzer.technologies.includes("StaffSpy"));
  assert.equal(analyzer.period, "Sep to Oct 2025");
  assert.ok(!analyzer.technologies.includes("AI service"));
  assert.equal(analyzer.note, undefined);
  assert.equal(analyzer.links[0].label, "Repository");
  assert.equal(experience.find((role) => role.id === "hal").summary, undefined);
  assert.equal(experience.find((role) => role.id === "hal").location, "Bengaluru, India");
  assert.deepEqual(skills.find((group) => group.category === "CI/CD").items, ["GitHub Actions"]);
  assert.ok(socialLinks.some((link) => link.href === "https://sonupatelal.substack.com/"));
  assert.ok(socialLinks.some((link) => link.href === "https://medium.com/@sonupatelal"));
  assert.equal(resume.downloadLabel, "Download PDF");
  assert.ok(!Object.hasOwn(resume, "versionNote"));
});
