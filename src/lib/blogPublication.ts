import { publicBlogSlugs as configuredPublicBlogSlugs } from "../data/publicBlogSlugs";

type BlogLink = {
  href: string;
};

type BlogPostModule = {
  Content: unknown;
  frontmatter: {
    slug: string;
    [key: string]: unknown;
  };
};

const blogPosts = Object.values(
  import.meta.glob("../content/blog/*.md", { eager: true }),
) as BlogPostModule[];

const configuredPublicBlogSlugSet = new Set<string>(configuredPublicBlogSlugs);

const blogPostsBySlug = new Map(
  blogPosts.map((post) => [post.frontmatter.slug, post] as const),
);

for (const slug of configuredPublicBlogSlugs) {
  if (!blogPostsBySlug.has(slug)) {
    throw new Error(`Unknown public blog slug configured: ${slug}`);
  }
}

export function isPublicBlogPost(post: BlogPostModule) {
  return configuredPublicBlogSlugSet.has(post.frontmatter.slug);
}

export function getPublicBlogPosts() {
  return configuredPublicBlogSlugs
    .map((slug) => blogPostsBySlug.get(slug))
    .filter((post): post is BlogPostModule => Boolean(post));
}

export const publicBlogSlugs = new Set(
  configuredPublicBlogSlugSet,
);

export function getBlogSlugFromHref(href: string) {
  const normalizedHref = href.split("#")[0]?.split("?")[0] ?? href;
  const match = normalizedHref.match(/^\/blog\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

export function isVisibleHref(href: string, visibleBlogSlugs = publicBlogSlugs) {
  const slug = getBlogSlugFromHref(href);
  return slug ? visibleBlogSlugs.has(slug) : true;
}

export function filterVisibleLinks<T extends BlogLink>(
  links: T[] | undefined,
  visibleBlogSlugs = publicBlogSlugs,
) {
  return (links ?? []).filter((link) => isVisibleHref(link.href, visibleBlogSlugs));
}
