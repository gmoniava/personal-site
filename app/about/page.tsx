"use client";
import React from "react";

// Display email on the client side to avoid spam bots
function ClientSideEmail() {
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setEmail(`moniava [dot] g [at] gmail [dot] com`);
  }, []);

  return (
    <div>
      {email ? (
        <p>{`If you have questions or comments feel free to get in touch (${email}).`}</p>
      ) : (
        <span>Loading email...</span>
      )}
    </div>
  );
}

export default function Page(props) {
  return (
    <div>
      {" "}
      <h1 className="mb-4 text-2xl font-semibold ">About</h1>
      <p className="mb-4">{`I am software developer (mostly front end) from Tbilisi, Georgia. On this web site you can explore my writings on software development, philosophy, psychology, and more.`}</p>
      <ClientSideEmail />
      <div className="mt-4 inline-flex items-center gap-3">
        <a
          href="https://stackoverflow.com/users/3963067/gmoniava"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-all text-blue-600 dark:dark:text-blue-400 underline-offset-2 decoration-[0.1em]"
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
          className="underline transition-all text-blue-600 dark:dark:text-blue-400 underline-offset-2 decoration-[0.1em]"
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
          className="underline transition-all text-blue-600 dark:dark:text-blue-400 underline-offset-2 decoration-[0.1em]"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
