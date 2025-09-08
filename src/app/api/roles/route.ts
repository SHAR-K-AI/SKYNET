import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Role {
    id: number;
    name: string;
    category: string;
    description?: string;
    requirements: {
        services: string[];
        tools: string[];
        platforms: string[];
        languages: string[];
    };
    responsibilities?: string[];
    links?: {
        documentation?: string;
        bestPractices?: string;
        tutorials?: string;
    };
}

const FILE_UA = path.join(process.cwd(), "/data/role_uk.json");
const FILE_EN = path.join(process.cwd(), "/data/role_en.json");

function readRoles(filePath: string): Role[] {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

export async function GET(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "uk";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;
        const roles = readRoles(filePath);

        return NextResponse.json(roles, {
            headers: {
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=59',
            },
        });
    } catch (err) {
        return NextResponse.json([], { status: 500 });
    }
}
