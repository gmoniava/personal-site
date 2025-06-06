import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export async function BlogPosts({ blogs }: any) {
  return (
    <div>
      {blogs.map((post) => (
        <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <div className="flex flex-wrap items-center space-x-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">{post.metadata.title}</p>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex space-x-1">
                  {post.metadata.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-300 text-sm px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
