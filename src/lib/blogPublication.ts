type PublicationStatus = "public" | "backlog";

type BlogLink = {
  href: string;
};

type BlogPostModule = {
  Content: unknown;
  frontmatter: {
    slug: string;
    publicationStatus?: PublicationStatus;
    [key: string]: unknown;
  };
};

const blogPosts = Object.values(
  import.meta.glob("../content/blog/*.md", { eager: true }),
) as BlogPostModule[];

export function isPublicBlogPost(post: BlogPostModule) {
  return post.frontmatter.publicationStatus !== "backlog";
}

export function getPublicBlogPosts() {
  return blogPosts.filter(isPublicBlogPost);
}

export const publicBlogSlugs = new Set(
  getPublicBlogPosts().map((post) => post.frontmatter.slug),
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
