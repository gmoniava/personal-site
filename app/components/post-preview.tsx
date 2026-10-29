import Link from "next/link";
import { formatDate } from "app/utils";
import PostTag from "./post-tag";

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
  onTagClick?: (tag: string) => void;
};

// Set to true to enable a subtle 2px title shift on hover.
const enableTitleHoverAnimation = false;
const titleHoverAnimationClasses =
  "transition-transform duration-200 ease-out hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none";

export default function PostPreview({ post, onTagClick }: BlogPostPreviewProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 sm:gap-0.5 mb-2">
        <Link
          href={`/blog/${post.slug}`}
          className={`self-start text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-neutral-100 ${enableTitleHoverAnimation ? titleHoverAnimationClasses : ""}`}
        >
          {post.metadata.title}
        </Link>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 w-[110px] flex-shrink-0">
          {formatDate(post.metadata.date, false)}
        </p>

        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {post.metadata.tags.map((tag: string) => (
              <PostTag key={tag} tag={tag} onTagClick={onTagClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
