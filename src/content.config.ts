import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    readingTime: z.string(),
    keywords: z.string(),
  }),
});

export const collections = { blog };
