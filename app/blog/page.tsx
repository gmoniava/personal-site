import { BlogPosts } from "app/components/client/posts";
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

  const tags = searchParams.tags?.split(",") ?? [];
  const page = parseInt(searchParams.page ?? "1", 10);

  // Pass parsed params to getBlogPosts
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
      <BlogPosts blogs={result.posts} currentPage={page} total={result.total} selectedTags={tags} />
    </section>
  );
}
