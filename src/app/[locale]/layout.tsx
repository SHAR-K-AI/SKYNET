import type {Metadata} from "next";
import {Roboto, Roboto_Mono} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "next-themes";
import Header from "@/components/Header";
import ThemeBackground from "@/components/ThemeBackground";
import {NextIntlClientProvider} from "next-intl";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Script from "next/script";
import {PlayerProvider} from "@/components/PlayerProvider";

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

export function generateMetadata({params}: PageProps): Metadata {
    const {locale} = params;
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
        <head>
            <Script
                id="hotjar-tracking"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6514708,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
                }}
            />
        </head>
        <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <ThemeBackground/>
                <PlayerProvider>
                    <div className="min-h-screen flex flex-col transition-colors">
                        <Header/>
                        <main className="flex-1 p-8 transition-colors">{children}</main>
                        <ScrollToTopButton/>
                        <Footer/>
                    </div>
                </PlayerProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
