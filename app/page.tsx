import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold ">Welcome to my web site</h1>
      <p className="mb-4">{`Here you will find some of my writings on topics such as: software engineering, phylosophy, psychology, and others.`}</p>
    </section>
  );
}
