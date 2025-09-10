import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE_UA = path.join(process.cwd(), "data/test_uk.json");
const FILE_EN = path.join(process.cwd(), "data/test_en.json");

function readQuestions(filePath: string) {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}


export async function GET(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "uk";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;

        const test = readQuestions(filePath);

        return NextResponse.json(test, {
            headers: {
                "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=59",
            },
        });
    } catch (err) {
        console.error("Error reading test:", err);
        return NextResponse.json([], { status: 500 });
    }
}
