import Link from "next/link";
import ClientSideEmail from "app/components/client/client-side-email";

export default function Page() {
  return (
    <div>
      <h1 className="mb-4 font-semibold">Hi, I’m Giorgi.</h1>
      <p className="mb-4 leading-relaxed">
        I’m a software developer based in Tbilisi, Georgia. For now, this site is mainly a blog where I write about
        software development and other topics that interest me.
      </p>
      <p className="mb-8">
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 underline underline-offset-2">
          Read my blog <span aria-hidden="true">→</span>
        </Link>
      </p>
      <ClientSideEmail />
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {[
          { label: "GitHub", href: "https://github.com/gmoniava" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/giorgi-moniava-1797a42" },
          { label: "Stack Overflow", href: "https://stackoverflow.com/users/3963067/gmoniava" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 underline underline-offset-2"
          >
            {label}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
