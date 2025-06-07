import PostsClient from "app/components/client/posts";
import { getBlogPosts } from "app/server/actions";
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
  const result = await getBlogPosts({ tagFilters: tags, page });

  // Sort the posts by published date in descending order
  result.posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold ">Blog Posts</h1>

      <PostsClient blogs={result.posts} currentPage={page} total={result.total} selectedTags={tags} />
    </section>
  );
}
