"use client";
import Link from "next/link";
import { formatDate } from "app/utils";
import React, { useId } from "react";
import Select from "react-select";
import { topics } from "app/topics";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import constants from "app/constants";

export function BlogPosts({ blogs, total }: any) {
  const selectId = useId();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const tags = searchParams.getAll("tags") || [];
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [optimisticTags, setOptimisticTags] = React.useOptimistic(getFullValues(tags));
  const [optimisticPage, setOptimisticPage] = React.useOptimistic(page);

  const postsPerPage = constants.LIMIT;
  const totalPages = Math.ceil(total / postsPerPage);

  // Because react-select wants values same type as options
  function getFullValues(values: string[]): any[] {
    return topics.filter((topic) => values.includes(topic.value));
  }

  function buildURLParams(tags: any[], page: number) {
    const params = new URLSearchParams();
    for (const tag of tags) {
      params.append("tags", tag.value);
    }
    if (page > 1) params.set("page", String(page));
    return params.toString();
  }

  function handleTagChange(value: any[]) {
    startTransition(() => {
      setOptimisticTags(value);
      setOptimisticPage(1); // Reset to page 1 on tag change
      const params = buildURLParams(value, 1);
      push(`${pathname}?${params}`);
    });
  }

  function handlePageChange(newPage: number) {
    startTransition(() => {
      setOptimisticPage(newPage);
      const params = buildURLParams(optimisticTags, newPage);
      push(`${pathname}?${params}`);
    });
  }

  return (
    <div>
      <div className="py-4">
        <Select
          isMulti
          instanceId={selectId}
          options={topics}
          value={optimisticTags}
          onChange={handleTagChange}
          className="text-black"
          classNamePrefix="react-select"
          placeholder="Filter posts by topics..."
        />
      </div>
      {isPending ? (
        <div className="mb-4 text-neutral-500 dark:text-neutral-400 animate-pulse">Loading blog posts...</div>
      ) : (
        blogs.map((post: any) => (
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
        ))
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => handlePageChange(optimisticPage - 1)}
          disabled={optimisticPage <= 1 || isPending}
          className="px-3 py-1 cursor-pointer text-sm rounded disabled:opacity-50"
        >
          <span className="inline-block font-bold cursor-pointer select-none hover:text-gray-700">&larr;</span>
          Prev
        </button>
        <span className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          {" "}
          {`${optimisticPage}/${totalPages}`}
        </span>
        <button
          onClick={() => handlePageChange(optimisticPage + 1)}
          disabled={optimisticPage >= totalPages || isPending}
          className="px-3 py-1 text-sm cursor-pointer rounded disabled:opacity-50"
        >
          Next
          <span className="inline-block select-none">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
