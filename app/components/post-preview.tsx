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

// Set to true to opt into the subtle background card effect on hover and keyboard focus.
const enableHoverCard = false;
const hoverCardClasses =
  "rounded-lg -mx-3 px-3 py-2 transition-colors duration-200 ease-out hover:bg-neutral-100 focus-visible:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800 motion-reduce:transition-none";

export default function PostPreview({ post }: BlogPostPreviewProps) {
  return (
    <Link
      key={post.slug}
      className={`block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${enableHoverCard ? hoverCardClasses : ""}`}
      href={`/blog/${post.slug}`}
    >
      <div className="flex flex-col gap-1 sm:gap-0.5 mb-2">
        <p className="text-neutral-900 dark:text-neutral-100">{post.metadata.title}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 w-[110px] flex-shrink-0">
          {formatDate(post.metadata.date, false)}
        </p>

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
    </Link>
  );
}
