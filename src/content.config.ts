import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    readingTime: z.string(),
    keywords: z.string(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    primaryServiceHref: z.string().optional(),
    primaryServiceLabel: z.string().optional(),
    secondaryServiceHref: z.string().optional(),
    secondaryServiceLabel: z.string().optional(),
    contactSource: z.string().optional(),
    businessOutcome: z.string().optional(),
  }),
});

export const collections = { blog };
