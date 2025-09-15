import Parser from "rss-parser";

const parser = new Parser({
    customFields: {
        item: [
            "media:content",
            "media:description",
            "description",
            "pubDate",
            "guid",
            ["category", "categories", { keepArray: true }],
            ["og", "og"],
            ["author", "author"]
        ],
    },
});

export async function getGoogleBlogPosts() {
    const feed = await parser.parseURL("https://blog.google/rss/");
    return feed.items || [];
}
