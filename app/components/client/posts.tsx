"use client";

import React, { useId } from "react";
import Select from "react-select";
import { topics } from "app/topics";
import constants from "app/constants";
import Post from "./post";
import Pagination from "./pagination";

export default function BlogPosts({ blogs }: any) {
  const selectId = useId();
  const [tags, setTags] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);

  // Parse URL parameters to initialize state such as tags and page number
  const pareURLParams = () => {
    const params = new URLSearchParams(window.location.search);

    // Get the tags from the URL
    const tagsParam = params.get("tags");
    const selectedTags = tagsParam ? topics.filter((t) => tagsParam.split(",").includes(t.value)) : [];

    // Get the page number from the URL, default to 1
    const parsedPage = parseInt(params.get("page") || "1", 10);

    setTags(selectedTags);
    setPage(parsedPage);
  };

  // Update the URL parameters without reloading the page
  // This function is called when tags or page changes
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

    // Also update the URL parameters
    updateURLParams(value, 1);
  };

  let handlePageChange = (newPage: number) => {
    setPage(newPage);

    // Also update the URL parameters
    updateURLParams(tags, newPage);
  };

  React.useEffect(() => {
    // Synchronize the initial state with URL parameters
    pareURLParams();

    const handlePopState = () => {
      pareURLParams();
    };

    // Listen for popstate events to handle back/forward navigation
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  let filteredPosts = blogs;

  // If tags are selected - filter the posts using the selected tags
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
          // AFAIK this was added to silence warning
          // https://stackoverflow.com/questions/61290173/react-select-how-do-i-resolve-warning-prop-id-did-not-match
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
      {/* Posts */}
      <div className="flex flex-col gap-4 items-start">
        {postForCurrentPage.map((post: any) => (
          <Post post={post} />
        ))}
      </div>
      <Pagination page={page} totalFilteredPages={totalFilteredPages} handlePageChange={handlePageChange} />
    </div>
  );
}
