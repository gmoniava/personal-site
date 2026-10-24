import Link from "next/link";

const sqlSeries = {
  title: "SQL Explained Through JavaScript",
  posts: [
    { slug: "how-to-make-sql-easier-to-understand-for-developers", label: "Part 1" },
    { slug: "sql-explained-through-javascript-2", label: "Part 2" },
  ],
};

export function PostSeries({ slug }: { slug: string }) {
  const currentIndex = sqlSeries.posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) return null;

  return (
    <>
      <nav
        aria-label={`${sqlSeries.title} series`}
        className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-800"
      >
        <p className="text-neutral-600 dark:text-neutral-400">
          Part {currentIndex + 1} of {sqlSeries.posts.length} in the series
        </p>
        <p className="mt-1 font-medium">{sqlSeries.title}</p>
        <ol className="mt-3 flex flex-col gap-2">
          {sqlSeries.posts.map((post) => (
            <li key={post.slug}>
              {post.slug === slug ? (
                <span aria-current="page" className="font-medium">
                  {post.label} <span className="font-normal text-neutral-600 dark:text-neutral-400">(you’re here)</span>
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {post.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <strong className="font-medium">Note:</strong> Familiarity with JavaScript and basic SQL-tables, rows, columns,
        and <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>-will help you follow the examples.
      </p>
    </>
  );
}
