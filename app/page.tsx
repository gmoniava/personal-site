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
          Read my blog
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
            className="text-blue-600 dark:text-blue-400 underline underline-offset-2"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
