import type { ReactNode } from "react";

// Use a div so MDX can safely render paragraphs inside multiline notes.
// Override prose paragraph colors and margins to match notes outside articles.
type NoteProps = {
  children: ReactNode;
  variant?: "default" | "outlined";
  "aria-labelledby"?: string;
};

export function Note({ children, variant = "default", "aria-labelledby": labelledBy }: NoteProps) {
  const outlined = variant === "outlined";
  const Container = outlined ? "aside" : "div";
  const layout = outlined
    ? "mt-8 flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700"
    : "mt-4 [&_strong]:font-medium";

  return (
    <Container
      aria-labelledby={labelledBy}
      className={`${layout} text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 [&_p]:my-0! [&_p]:text-inherit!`}
    >
      {children}
    </Container>
  );
}
