import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// import { randomUUID } from "crypto";

interface FAQItem {
    id: string;
    level: string;
    question: string;
    answer: string;
}

const FILE_UA = path.join(process.cwd(), "data/faqs_uk.json");
const FILE_EN = path.join(process.cwd(), "data/faqs_en.json");

function readFaqs(filePath: string): FAQItem[] {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

// function writeFaqs(filePath: string, faqs: FAQItem[]) {
//     fs.writeFileSync(filePath, JSON.stringify(faqs, null, 2));
// }

export async function GET(req: NextRequest) {
    try {
        const lang = req.nextUrl.searchParams.get("lang") || "uk";
        const filePath = lang === "en" ? FILE_EN : FILE_UA;
        const faqs = readFaqs(filePath);

        return NextResponse.json(faqs, {
            headers: {
                'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=59',
            },
        });
    } catch (err) {
        return NextResponse.json([], { status: 500 });
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const newFaq: Omit<FAQItem, "id"> & { questionUA: string; answerUA: string; questionEN: string; answerEN: string; level: string } = await req.json();
//         const id = randomUUID();
//
//         const faqUA: FAQItem = { id, level: newFaq.level, question: newFaq.questionUA, answer: newFaq.answerUA };
//         const faqsUA = readFaqs(FILE_UA);
//         faqsUA.push(faqUA);
//         writeFaqs(FILE_UA, faqsUA);
//
//         const faqEN: FAQItem = { id, level: newFaq.level, question: newFaq.questionEN, answer: newFaq.answerEN };
//         const faqsEN = readFaqs(FILE_EN);
//         faqsEN.push(faqEN);
//         writeFaqs(FILE_EN, faqsEN);
//
//         return NextResponse.json({ id, level: newFaq.level }, { status: 201 });
//     } catch (err) {
//         return NextResponse.json({ error: "Failed to add FAQ" }, { status: 500 });
//     }
// }
//
// export async function PUT(req: NextRequest) {
//     try {
//         const lang = req.nextUrl.searchParams.get("lang") || "uk";
//         const filePath = lang === "en" ? FILE_EN : FILE_UA;
//         const updatedFaq: FAQItem = await req.json();
//
//         const faqs = readFaqs(filePath);
//         const index = faqs.findIndex(f => f.id === updatedFaq.id);
//
//         if (index === -1) {
//             return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
//         }
//
//         faqs[index] = updatedFaq;
//         writeFaqs(filePath, faqs);
//
//         return NextResponse.json(updatedFaq);
//     } catch (err) {
//         return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
//     }
// }
