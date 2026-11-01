import { getCollection } from "astro:content";

export async function getPublishedEntries(section: "posts" | "journal") {
  const posts = await getCollection("posts", ({ data }) => !data.draft && data.section === section);
  if (section === "posts" && posts.length === 0) {
    throw new Error("Posts is enabled but has no published entries. Check the content collection or restart Astro after adding it.");
  }
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) {
      throw new Error(`Use a lowercase, hyphen-separated post filename: ${post.id}`);
    }
    if (!post.body?.trim() && !post.data.source) {
      throw new Error(`Published post ${post.id} needs article content or a source link.`);
    }
  }
  return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export function getPublishedPosts() {
  return getPublishedEntries("posts");
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
