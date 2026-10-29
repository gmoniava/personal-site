"use client";

import Link from "next/link";

export default function PostTag({ tag, onTagClick }: { tag: string; onTagClick?: (tag: string) => void }) {
  return (
    <Link
      href={`/blog?tags=${encodeURIComponent(tag)}`}
      // On the Blog page, clicking a tag should update the filter without navigating.
      // But someone holding Ctrl/Cmd wants to open the link in a new tab instead.
      // Calling preventDefault() would stop that, so we only cancel normal clicks.
      // Outside the Blog page, no filter handler is supplied and the link works normally.
      onClick={(event) => {
        // Only intercept the click if a filter handler exists and the event hasn't already been handled.
        if (!onTagClick || event.defaultPrevented) return;

        // button === 0 means the main mouse button (usually left-click).
        // Keyboard activation of a link also produces a click with button === 0.
        const isPrimaryClick = event.button === 0;

        // Check whether Command (Mac), Ctrl, Shift, or Alt is held while clicking.
        // These keys can change the browser's link behavior, such as opening a new tab.
        const hasModifierKey = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

        // Let the browser handle modified clicks, such as Ctrl-click to open a new tab.
        if (!isPrimaryClick || hasModifierKey) return;

        // Update the Blog filter without navigating away.
        event.preventDefault();
        onTagClick(tag);
      }}
      aria-label={`View posts tagged ${tag}`}
      className="rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800 transition-colors duration-150 hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600 motion-reduce:transition-none"
    >
      {tag}
    </Link>
  );
}
