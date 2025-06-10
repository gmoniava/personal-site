"use client";
import Link from "next/link";
import { formatDate } from "app/utils";
import React, { useId } from "react";
import Select from "react-select";
import { topics } from "app/topics";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import constants from "app/constants";

export default function BlogPosts({ blogs }: any) {
  const selectId = useId();

  const [tags, setTags] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);

  function handleTagChange(value: any[]) {
    setTags(value);
  }

  let filteredPosts = blogs;

  // If tags are selected, filter the posts
  if (tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      const postTags = post.metadata.tags ?? [];
      return postTags.some((tag) => tags?.map((t) => t.value).includes(tag));
    });
  }

  // Compute total pages based on filtered posts
  const totalFilteredPages = Math.ceil(filteredPosts.length / constants.LIMIT);

  // Now get the posts for the current page
  const startIndex = (page - 1) * constants.LIMIT;
  let postForCurrentPage = filteredPosts.slice(startIndex, startIndex + constants.LIMIT);

  return (
    <div>
      <div className="py-4 mb-4">
        <Select
          isMulti
          instanceId={selectId}
          options={topics}
          value={tags}
          onChange={handleTagChange}
          className="text-black w-2/3"
          classNamePrefix="react-select"
          placeholder="Filter posts by topics..."
        />
      </div>
      {postForCurrentPage.map((post: any) => (
        <Link key={post.slug} className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
          <div className="w-full flex flex-col md:flex-row gap-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">{post.metadata.title}</p>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex">
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

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 cursor-pointer text-sm rounded disabled:opacity-50"
        >
          <span className="inline-block font-bold cursor-pointer select-none hover:text-gray-700">&larr;</span>
          Prev
        </button>
        <span className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          {" "}
          {`${totalFilteredPages > 0 ? page : 0}/${totalFilteredPages}`}
        </span>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page >= totalFilteredPages}
          className="px-3 py-1 text-sm cursor-pointer rounded disabled:opacity-50"
        >
          Next
          <span className="inline-block select-none">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
