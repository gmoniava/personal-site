import PostsServer from "app/components/server/posts";

export const metadata = {
  title: "Blog",
  alternates: {
    canonical: "https://www.gmoniava.com/blog",
  },
};

export default async function Page() {
  return (
    <div>
      <PostsServer />
    </div>
  );
}
