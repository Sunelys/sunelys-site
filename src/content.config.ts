import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    publicationStatus: z.enum(["public", "backlog"]).default("public"),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.string(),
    readingTime: z.string(),
    keywords: z.string(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
    ogImage: z.string().optional(),
    primaryServiceHref: z.string().optional(),
    primaryServiceLabel: z.string().optional(),
    secondaryServiceHref: z.string().optional(),
    secondaryServiceLabel: z.string().optional(),
    contactSource: z.string().optional(),
    businessOutcome: z.string().optional(),
    relatedLinks: z
      .array(
        z.object({
          href: z.string(),
          label: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    faqItems: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { blog };
