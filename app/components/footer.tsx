// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8 mb-12 text-neutral-600 dark:text-neutral-300">
      <p>
        © {new Date().getFullYear()} MIT License for code. Content licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          CC BY 4.0
        </a>
        .{" "}
        {/* To restore the AI disclosure:
            1. Uncomment the Link import above and the separator/link below.
            2. Rename app/ai-disclosure/page.tsx.disabled to page.tsx.
            3. Uncomment "/ai-disclosure" in app/sitemap.ts.
        */}
        {/*
        <span aria-hidden="true" className="mx-2">|</span>{" "}
        <Link href="/ai-disclosure" className="whitespace-nowrap underline underline-offset-2 hover:text-blue-600">
          AI disclosure
        </Link>
        */}
      </p>
    </footer>
  );
}
