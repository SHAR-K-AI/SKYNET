import Parser from "rss-parser";

const parser = new Parser();

export async function getGoogleBlogPosts() {
    const feed = await parser.parseURL("https://blog.google/rss/");
    return feed.items?.slice(0, 10) || []; // останні 10 новин
}
