import PostsClient from "app/components/client/posts";
import { getBlogPosts } from "app/server/lib";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const result = getBlogPosts();

  // Sort the posts by published date in descending order
  result.posts.sort((a, b) => {
    if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
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
      <PostsClient blogs={simplifiedPosts} />
    </section>
  );
}
