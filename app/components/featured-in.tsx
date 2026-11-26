import ExternalLinkIcon from "./external-link-icon";

export type Publication = { title: string; url: string };

export default function FeaturedIn({ publications }: { publications?: Publication[] }) {
  if (!publications?.length) return null;

  return (
    <p className="mt-1 flex items-baseline gap-1 text-sm text-neutral-600 dark:text-neutral-400">
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
