export default function Footer() {
  return (
    <footer className="mb-16">
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT License for code. Content licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-600"
        >
          CC BY 4.0
        </a>
        .
      </p>
    </footer>
  );
}
