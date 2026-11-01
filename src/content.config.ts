import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: ".\\src\\content\\posts" }),
  schema: z.object({
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    published: z.coerce.date(),
    draft: z.boolean().default(false),
    section: z.enum(["posts", "journal"]).default("posts"),
    tags: z.array(z.string().trim().min(1)).default([]),
    source: z.object({
      label: z.string().trim().min(1),
      url: z.url({ protocol: /^https$/ }),
    }).optional(),
  }),
});

export const collections = { posts };
