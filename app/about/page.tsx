export const metadata = {
  title: "About",
  description: "About the web site and its author.",
};

export default async function Page(props) {
  return (
    <div>
      {" "}
      <h1 className="mb-4 text-2xl font-semibold ">About</h1>
      <p className="mb-4">{`I am software developer (mostly front end) from Tbilisi, Georgia. On this web site you can explore my writings on software engineering, philosophy, psychology, and more.`}</p>
      <div></div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
        <a
          href="https://stackoverflow.com/users/3963067/gmoniava"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          Stack Overflow
        </a>

        {/* Vertical Divider */}
        <div
          style={{
            borderLeft: "1px solid #ccc",
            height: "20px",
          }}
        />

        <a
          href="https://github.com/gmoniava"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          GitHub
        </a>

        {/* Vertical Divider */}
        <div
          style={{
            borderLeft: "1px solid #ccc",
            height: "20px",
          }}
        />

        <a
          href="https://www.linkedin.com/in/giorgi-moniava-1797a42"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
