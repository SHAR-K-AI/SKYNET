import "../globals.css";

import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";

import { PlayerProvider } from "@/components/PlayerProvider";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeBackground from "@/components/ThemeBackground";
import WelcomeModalWrapper from "@/components/WelcomeModal";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default async function LocaleLayout(
    {
        children,
        params,
    }: {
        children: React.ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const { locale } = await params as { locale: "en" | "ua" };

    const metaData = {
        en: {
            title: "SkyNet",
            description: "Fan site for learning GCP, AI, and cloud technologies",
            url: "https://s-k-y-n-e-t.vercel.app/en",
            image: "https://s-k-y-n-e-t.vercel.app/images/about.png",
        },
        uk: {
            title: "SkyNet",
            description: "Фан-сайт SkyNet для навчання GCP, AI та хмарних технологій",
            url: "https://s-k-y-n-e-t.vercel.app/uk",
            image: "https://s-k-y-n-e-t.vercel.app/images/about.png",
        },
    };

    const { title, description, url, image } = metaData[locale] || metaData.en;

    return (
        <html lang={locale} className="scroll-smooth">
        <head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="SkyNet Preview" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="apple-mobile-web-app-title" content="SkyNet" />

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
        <body className="antialiased">
        <NextIntlClientProvider locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <ThemeBackground />
                <PlayerProvider>
                    <div className="min-h-screen flex flex-col transition-colors">
                        <Header />
                        <main className="flex-1 p-8 transition-colors">{children}</main>
                        <ScrollToTopButton />
                        <Footer />
                        <WelcomeModalWrapper />
                    </div>
                </PlayerProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
