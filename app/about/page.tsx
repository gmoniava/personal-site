import { BlogPosts } from "app/components/client/posts";
import { getBlogPosts } from "app/server/actions";

export const metadata = {
  title: "About",
  description: "About the web site and its author.",
};

export default async function Page(props) {
  return (
    <div>
      {" "}
      <h1 className="mb-8 text-2xl font-semibold ">About</h1>
      <p className="mb-4">{`...`}</p>
    </div>
  );
}
