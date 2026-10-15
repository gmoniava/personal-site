import PostsServer from "app/components/server/posts";

export const metadata = { title: "Blog" };

export default async function Page() {
  return (
    <div>
      <PostsServer />
    </div>
  );
}
