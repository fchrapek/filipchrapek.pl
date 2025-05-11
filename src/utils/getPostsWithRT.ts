import type { MarkdownInstance } from "astro";
import slugify from "./slugify";
import type { CollectionEntry } from "astro:content";

export const getReadingTime = async () => {
  // Get all posts using glob. This is to get the updated frontmatter
  const mdxPosts = import.meta.glob("../content/blog/*.mdx");
  const mdPosts = import.meta.glob("../content/blog/*.md");
  
  // Combine both .mdx and .md posts
  const globPosts = { ...mdxPosts, ...mdPosts };

  // Then, set those frontmatter value in a JS Map with key value pair
  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async (globPost: any) => {
      try {
        const { frontmatter } = await globPost();
        if (frontmatter && frontmatter.readingTime) {
          mapFrontmatter.set(slugify(frontmatter), frontmatter.readingTime);
        }
      } catch (error) {
        console.error("Error processing post for reading time:", error);
      }
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugify(post.data));
    return post;
  });
};

export default getPostsWithRT;