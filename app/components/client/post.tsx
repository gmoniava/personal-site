import Link from "next/link";
import { formatDate } from "app/utils";

type Post = {
  slug: string;
  metadata: {
    date: string;
    title: string;
    tags?: string[];
  };
};

type BlogPostPreviewProps = {
  post: Post;
};

export default function Post({ post }: BlogPostPreviewProps) {
  return (
    <Link key={post.slug} className="w-full" href={`/blog/${post.slug}`}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
        {/* Date */}
        <p className="text-neutral-600 text-sm dark:text-neutral-400 w-[110px] flex-shrink-0">
          {formatDate(post.metadata.date, false)}
        </p>

        {/* Right section: title and tags */}
        <div className="flex flex-col">
          {/* Title */}
          <p className="text-neutral-900 dark:text-neutral-100">{post.metadata.title}</p>

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
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
  );
}
