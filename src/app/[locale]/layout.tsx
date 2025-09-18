import "../globals.css";

import {ThemeProvider} from "next-themes";
import Header from "@/components/Header";
import ThemeBackground from "@/components/ThemeBackground";
import {NextIntlClientProvider} from "next-intl";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Script from "next/script";
import {PlayerProvider} from "@/components/PlayerProvider";
import WelcomeModalWrapper from "@/components/WelcomeModal";

// import type { Metadata } from "next";

// export async function generateMetadata(
//     { params }: { params: { locale: string } }
// ): Promise<Metadata> {
//     const { locale } = params;
//
//     const siteMetadata: Record<string, Metadata> = {
//         en: {
//             title: "SkyNet",
//             description: "Fan site for learning GCP, AI, and cloud technologies",
//             openGraph: {
//                 title: "SkyNet",
//                 description: "Fan site for learning GCP, AI, and cloud technologies",
//                 url: "https://s-k-y-n-e-t.vercel.app/en",
//                 images: [
//                     {
//                         url: "https://s-k-y-n-e-t.vercel.app/images/about.png",
//                         width: 1200,
//                         height: 630,
//                         alt: "SkyNet Preview",
//                     },
//                 ],
//                 type: "website",
//             },
//             twitter: {
//                 card: "summary_large_image",
//                 title: "SkyNet",
//                 description: "Fan site for learning GCP, AI, and cloud technologies",
//                 images: ["https://s-k-y-n-e-t.vercel.app/images/about.png"],
//             },
//         },
//         ua: {
//             title: "SkyNet",
//             description: "Фан-сайт SkyNet для навчання GCP, AI та хмарних технологій",
//             openGraph: {
//                 title: "SkyNet",
//                 description: "Фан-сайт SkyNet для навчання GCP, AI та хмарних технологій",
//                 url: "https://s-k-y-n-e-t.vercel.app/uk",
//                 images: [
//                     {
//                         url: "https://s-k-y-n-e-t.vercel.app/images/about.png",
//                         width: 1200,
//                         height: 630,
//                         alt: "SkyNet Preview",
//                     },
//                 ],
//                 type: "website",
//             },
//             twitter: {
//                 card: "summary_large_image",
//                 title: "SkyNet",
//                 description: "Фан-сайт SkyNet для навчання GCP, AI та хмарних технологій",
//                 images: ["https://s-k-y-n-e-t.vercel.app/images/about.png"],
//             },
//         },
//     };
//
//     return siteMetadata[locale] || siteMetadata.en;
// }

export default async function LocaleLayout(
    {
        children,
        params,
    }: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
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
            <meta name="apple-mobile-web-app-title" content="SkyNet" />
        </head>
        <body className="antialiased">
        <NextIntlClientProvider locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <ThemeBackground/>
                <PlayerProvider>
                    <div className="min-h-screen flex flex-col transition-colors">
                        <Header/>
                        <main className="flex-1 p-8 transition-colors">{children}</main>
                        <ScrollToTopButton/>
                        <Footer/>
                        <WelcomeModalWrapper />
                    </div>
                </PlayerProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
