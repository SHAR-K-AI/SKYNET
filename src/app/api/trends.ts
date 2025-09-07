import Parser from "rss-parser";

type GoogleTrendsItem = {
    title: string;
    link: string;
    "ht:approx_traffic"?: string;
    "ht:picture"?: string;
    "ht:picture_source"?: string;
    "ht:news_item"?: any[];
};

const parser = new Parser<{}, GoogleTrendsItem>({
    customFields: {
        item: [
            'ht:approx_traffic',
            'ht:picture',
            'ht:picture_source',
            ['ht:news_item', 'ht:news_item', { keepArray: true }]
        ],
    },
});

export async function getGoogleTrends(): Promise<GoogleTrendsItem[]> {
    const feed = await parser.parseURL(
        "https://trends.google.com/trending/rss?geo=UA"
    );

    const trends: GoogleTrendsItem[] =
        feed.items?.slice(0, 15).map((item: any) => ({
            title: item.title || "",
            link: item.link || "",
            traffic: item["ht:approx_traffic"] || "",
            picture: item["ht:picture"] || "",
            pictureSource: item["ht:picture_source"] || "",
            news: (item["ht:news_item"] || []).map((n: any) => ({
                title: n["ht:news_item_title"] || "",
                snippet: n["ht:news_item_snippet"] || "",
                url: n["ht:news_item_url"] || "",
                picture: n["ht:news_item_picture"] || "",
                source: n["ht:news_item_source"] || "",
            })),
        })) || [];

    return trends;
}

// (async () => {
//     const trends = await getGoogleTrends();
//     console.log(JSON.stringify(trends, null, 2));
// })();
