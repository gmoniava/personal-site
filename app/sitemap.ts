import { getBlogPosts } from "app/server/lib";

export const baseUrl = "https://www.gmoniava.com";

export default async function sitemap() {
  let blogs = getBlogPosts()?.posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  let routes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
