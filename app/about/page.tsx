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
      <p className="mb-4">{`My name is Giorgi Moniava, I am a front end developer from Tbilisi, Georgia. Here you will find some of my writings on 
      software engineering, philosophy, psychology, and more.`}</p>
    </div>
  );
}
