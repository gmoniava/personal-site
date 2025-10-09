import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  date: string;
  lastUpdated?: string;
  summary: string;
  image?: string;
  tags: string[];
};

function parseFrontmatter(fileContent: string) {
  // Regex to find content between --- and --- (the frontmatter block)
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;

  // Execute regex to get frontmatter block
  let match = frontmatterRegex.exec(fileContent);

  // Extract frontmatter text (inside the --- lines)
  let frontMatterBlock = match![1];

  // Remove frontmatter block from file content to get main content
  let content = fileContent.replace(frontmatterRegex, "").trim();

  // Split frontmatter into individual lines (each line is key: value)
  let frontMatterLines = frontMatterBlock.trim().split("\n");

  // Prepare an empty object to hold metadata key-value pairs
  let metadata: any = {};

  // Parse each frontmatter line into key and value, then store in metadata
  frontMatterLines.forEach((line) => {
    // Split at first ": "
    let [key, ...valueArr] = line.split(": ");

    // Join back in case value has ":"
    let value = valueArr.join(": ").trim();

    // Remove surrounding quotes
    value = value.replace(/^['"](.*)['"]$/, "$1");

    // Handle array values like ["a", "b"]
    if (value.startsWith("[") && value.endsWith("]")) {
      // Try parsing as JSON array
      try {
        metadata[key.trim()] = JSON.parse(value);
      } catch {
        // If JSON.parse fails, fallback to simple split
        let items = value
          .slice(1, -1) // remove [ and ]
          .split(",")
          .map((v) => v.trim().replace(/^['"](.*)['"]$/, "$1"));
        metadata[key.trim()] = items;
      }
    } else {
      metadata[key.trim()] = value;
    }
  });

  // Return parsed metadata and remaining content
  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  // Get all MDX files in the specified directory
  let mdxFiles = getMDXFiles(dir);

  // Read each MDX file, parse its frontmatter and content
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  const postsDir = path.join(process.cwd(), "app", "blog", "posts");
  const allPosts = getMDXData(postsDir);

  return { posts: allPosts, total: allPosts.length };
}
