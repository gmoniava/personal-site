import PostsServer from "app/components/server/posts";

export default async function Page(props: {
  searchParams?: Promise<{
    tags?: string;
    page?: string;
  }>;
}) {
  return (
    <div>
      <PostsServer searchParams={props.searchParams} />
    </div>
  );
}
