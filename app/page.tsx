import { BlogPosts } from "app/components/client/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold ">Welcome to my web site</h1>
      <p className="mb-4">{`Explore my writings on software engineering, philosophy, psychology, and more.`}</p>
    </section>
  );
}
