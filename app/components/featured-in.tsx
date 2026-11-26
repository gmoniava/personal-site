import ExternalLinkIcon from "./external-link-icon";

export type Publication = { title: string; url: string };

export default function FeaturedIn({ publications }: { publications?: Publication[] }) {
  if (!publications?.length) return null;

  return (
    <p className="mt-1 flex items-baseline gap-1 text-sm text-neutral-600 dark:text-neutral-400">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-3 w-3 shrink-0 self-start mt-1"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </svg>
      <span>
        Featured in{" "}
        {publications.map((feature, index) => (
          <span key={feature.url}>
            {index > 0 && " & "}
            <a
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 underline underline-offset-2 decoration-[0.1em] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {feature.title}
              <ExternalLinkIcon />
            </a>
          </span>
        ))}
      </span>
    </p>
  );
}
