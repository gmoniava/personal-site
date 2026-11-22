import PostsClient from "app/components/client/posts";
import { getBlogPosts } from "app/server/lib";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default async function Page() {
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
      <div className="flex items-center mb-4 gap-2">
        {" "}
        <h1 className="font-semibold ">Blog</h1>
        <a className="" rel="noopener noreferrer" target="_blank" title="Subscribe via RSS" href="/rss">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <path d="M4 11a9 9 0 0 1 9 9" />
          </svg>
        </a>
      </div>

      <p>
        {/* To hide the AI disclosure (reverse these steps to restore it):
            1. Comment out the Link import above and the Link element below.
            2. Rename app/ai-disclosure/page.tsx to page.tsx.disabled.
            3. Remove "/ai-disclosure" from the routes array in app/sitemap.ts.
        */}
        {/* <Link href="/ai-disclosure" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">
          How I use AI in my writing
        </Link> */}
      </p>
      <PostsClient blogs={simplifiedPosts} />
    </section>
  );
}
