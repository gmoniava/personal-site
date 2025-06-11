export const metadata = {
  title: "About",
  description: "About the web site and its author.",
};

export default async function Page(props) {
  return (
    <div>
      {" "}
      <h1 className="mb-4 text-2xl font-semibold ">About</h1>
      <p className="mb-4">{`Software developer from Tbilisi, Georgia. On this web site you can explore my writings on software engineering, philosophy, psychology, and more.`}</p>
    </div>
  );
}
