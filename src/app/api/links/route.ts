import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface LinkItem {
    type: "youtube" | "card" | "link";
    title: string;
    url: string;
    description?: string;
    imageUrl?: string;
}

const FILE_UA = path.join(process.cwd(), "data/links_uk.json");
const FILE_EN = path.join(process.cwd(), "data/links_en.json");

function readLinks(filePath: string): LinkItem[] {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

export async function GET(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "uk";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;
        const links = readLinks(filePath);

        return NextResponse.json(links, {
            headers: {
                "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=59",
            },
        });
    } catch (err) {
        return NextResponse.json([], { status: 500 });
    }
}
