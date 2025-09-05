import type {Metadata} from "next";
import {Roboto, Roboto_Mono} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "next-themes";
import Header from "@/components/Header";
import ThemeBackground from "@/components/ThemeBackground";
import {NextIntlClientProvider} from "next-intl";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "700"],
});
const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface MetadataByLocale {
    [locale: string]: Metadata;
}

const siteMetadata: MetadataByLocale = {
    en: {
        title: "SkyNet",
        description: "Fan site for learning GCP, AI, and cloud technologies",
    },
    ua: {
        title: "SkyNet",
        description: "Фан-сайт Skynet для навчання GCP, AI та хмарних технологій",
    },
};

interface PageProps {
    params: { locale: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
    const { locale } = params;
    return siteMetadata[locale] || siteMetadata['en'];
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const {locale} = await params;

    return (
        <html lang={locale} className="scroll-smooth">
        <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <ThemeBackground/>
                <div className="min-h-screen flex flex-col transition-colors">
                    <Header/>
                    <main className="flex-1 p-8 transition-colors">{children}</main>
                    <ScrollToTopButton/>
                    <Footer/>
                </div>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
