import PostsClient from "app/components/client/posts";
import { getBlogPosts } from "app/server/lib";
import constants from "app/constants";
export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default async function Page(props: {
  searchParams?: Promise<{
    tags?: string;
    page?: string;
  }>;
}) {
  const searchParams = (await props.searchParams) ?? {};

  const tagsParam = searchParams.tags;
  const tags = Array.isArray(tagsParam) ? tagsParam : tagsParam ? [tagsParam] : [];
  const page = parseInt(searchParams.page ?? "1", 10);

  // Get the blog posts based on the search parameters
  const result = getBlogPosts({ tagFilters: tags, page, limit: constants.LIMIT });

  // Sort the posts by published date in descending order
  result.posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // Keep only slug and metadata for the client
  const simplifiedPosts = result.posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
  }));

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold ">Blog Posts</h1>
      <PostsClient blogs={simplifiedPosts} page={page} total={result.total} />
    </section>
  );
}
