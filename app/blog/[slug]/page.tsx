import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/server/mdx";
import { getBlogPosts } from "app/server/lib";
import { formatDate } from "app/utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getBlogPosts()?.posts;

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  let post = getBlogPosts()?.posts?.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let { title, date: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: post.slug === "how-i-built-this-blog-using-nextjs" ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: url,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let post = getBlogPosts()?.posts?.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Giorgi Moniava",
            },
          }),
        }}
      />
      {/* Title and date */}
      <h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
      <div className="flex justify-between items-center my-4 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.metadata.date)}</p>
      </div>
      {/* Show the tags */}
      <div className="mb-4">
        {post.metadata.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-300 text-sm px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Here goes the post itself. It is written in MDX format, so we can use the CustomMDX component to render it. */}
      <article className="prose mt-8">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
