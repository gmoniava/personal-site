"use client";
import Link from "next/link";
import { formatDate } from "app/utils";
import React, { useId } from "react";
import Select from "react-select";
import { topics } from "app/topics";
import constants from "app/constants";

export default function BlogPosts({ blogs }: any) {
  const selectId = useId();
  const [tags, setTags] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);

  const parseParams = () => {
    const params = new URLSearchParams(window.location.search);
    const tagsParam = params.get("tags");
    const selectedTags = tagsParam ? topics.filter((t) => tagsParam.split(",").includes(t.value)) : [];
    const pageParam = parseInt(params.get("page") || "1", 10);

    setTags(selectedTags);
    setPage(pageParam);
  };

  const updateURLParams = (newTags: any[], newPage: number) => {
    const params = new URLSearchParams();
    if (newTags.length > 0) {
      params.set("tags", newTags.map((t) => t.value).join(","));
    }
    if (newPage > 1) {
      params.set("page", String(newPage));
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // Use native history API to update the URL without re-rendering server component
    window.history.pushState(null, "", newUrl);
  };

  let handleTagChange = (value: any[]) => {
    setTags(value);
    setPage(1);
    updateURLParams(value, 1);
  };

  let handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURLParams(tags, newPage);
  };

  React.useEffect(() => {
    // initialize on load
    parseParams();

    const handlePopState = () => {
      parseParams();
    };

    // Listen for popstate events to handle back/forward navigation
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
          styles={{
            option: (styles, state) => ({
              ...styles,
              cursor: "pointer",
            }),
            control: (styles) => ({
              ...styles,
              cursor: "pointer",
            }),
          }}
          onChange={handleTagChange}
          className="text-black w-2/3"
          classNamePrefix="react-select"
          placeholder="Filter posts by topics..."
        />
      </div>
      <div className="flex flex-col gap-4 items-start">
        {postForCurrentPage.map((post: any) => (
          <Link key={post.slug} className="w-full" href={`/blog/${post.slug}`}>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
              {/* Date */}
              <p className="text-neutral-600 text-sm dark:text-neutral-400 w-[110px] flex-shrink-0">
                {formatDate(post.metadata.date, false)}
              </p>

              {/* Right section: title + tags */}
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
        ))}
      </div>
      {/* Show pagination controls if there are multiple pages */}
      {totalFilteredPages > 1 ? (
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={() => {
              handlePageChange(page - 1);
            }}
            disabled={page <= 1}
            className="px-3 py-1 cursor-pointer text-sm rounded disabled:opacity-50"
          >
            <span className="inline-block font-bold cursor-pointer select-none hover:text-gray-700">&larr;</span>
            Prev
          </button>
          <span className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            {" "}
            {`${page}/${totalFilteredPages}`}
          </span>
          <button
            onClick={() => {
              handlePageChange(page + 1);
            }}
            disabled={page >= totalFilteredPages}
            className="px-3 py-1 text-sm cursor-pointer rounded disabled:opacity-50"
          >
            Next
            <span className="inline-block select-none">&rarr;</span>
          </button>
        </div>
      ) : totalFilteredPages === 0 ? (
        <div className="text-xs text-neutral-600 dark:text-neutral-400">No results</div>
      ) : null}
    </div>
  );
}
