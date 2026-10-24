import type { ReactNode } from "react";

// Use a div so MDX can safely render paragraphs inside multiline notes.
// Override prose paragraph colors and margins to match notes outside articles.
export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 [&_p]:my-0! [&_p]:text-inherit!">
      {children}
    </div>
  );
}
