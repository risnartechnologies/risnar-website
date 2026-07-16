import fs from "fs";
import path from "path";

/* =========================================================
   BLOGS DIRECTORY
   ========================================================= */

const BLOGS_DIR = path.join(
  process.cwd(),
  "content",
  "blogs"
);

/* =========================================================
   GET ALL BLOG SLUGS
   ========================================================= */

export function getAllBlogSlugs(): string[] {
  if (
    !fs.existsSync(
      BLOGS_DIR
    )
  ) {
    return [];
  }

  return fs
    .readdirSync(
      BLOGS_DIR,
      {
        withFileTypes: true,
      }
    )
    .filter(
      (entry) =>
        entry.isDirectory()
    )
    .map(
      (entry) =>
        entry.name
    )
    .sort();
}