import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface ResourceItem {
    id: string;
    title: string;
    link: string;
    imageUrl: string;
    description: string;
    content: string;
}

const FILE_UA = path.join(process.cwd(), "resources_ua.json");
const FILE_EN = path.join(process.cwd(), "resources_en.json");

function readResources(filePath: string): ResourceItem[] {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writeResources(filePath: string, resources: ResourceItem[]) {
    fs.writeFileSync(filePath, JSON.stringify(resources, null, 2));
}

export async function GET(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "en";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;
        const resources = readResources(filePath);

        return NextResponse.json(resources, {
            headers: {
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=59',
            },
        });
    } catch (err) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const newResource: Omit<ResourceItem, "id"> & { titleUA: string; descriptionUA: string; contentUA: string; titleEN: string; descriptionEN: string; contentEN: string } = await req.json();
        const id = randomUUID();

        const resourceUA: ResourceItem = {
            id,
            title: newResource.titleUA,
            link: newResource.link,
            imageUrl: newResource.imageUrl,
            description: newResource.descriptionUA,
            content: newResource.contentUA,
        };
        const resourcesUA = readResources(FILE_UA);
        resourcesUA.push(resourceUA);
        writeResources(FILE_UA, resourcesUA);

        const resourceEN: ResourceItem = {
            id,
            title: newResource.titleEN,
            link: newResource.link,
            imageUrl: newResource.imageUrl,
            description: newResource.descriptionEN,
            content: newResource.contentEN,
        };
        const resourcesEN = readResources(FILE_EN);
        resourcesEN.push(resourceEN);
        writeResources(FILE_EN, resourcesEN);

        return NextResponse.json({ id }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to add resource" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "en";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;
        const updatedResource: ResourceItem = await req.json();

        const resources = readResources(filePath);
        const index = resources.findIndex(r => r.id === updatedResource.id);

        if (index === -1) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        resources[index] = updatedResource;
        writeResources(filePath, resources);

        return NextResponse.json(updatedResource);
    } catch (err) {
        return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
    }
}
