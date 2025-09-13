import { getGoogleTrends } from "@/app/api/trends";
import TrendingInfo from "@/components/TrendingInfo";

interface TrendNewsItem {
    title: string | string[];
    snippet?: string | string[];
    url: string | string[];
    picture?: string | string[];
    source?: string | string[];
}

interface Trend {
    title: string;
    link: string;
    pubDate?: string;
    description?: string;
    extendedDescription?: string;
    picture?: string;
    traffic?: string;
    pictureSource?: string;
    news?: TrendNewsItem[];
}

const fallbackTrends: Trend[] = [
    {
        title: "Немає даних",
        link: "#",
        description: "Не вдалося завантажити тренди. Спробуйте пізніше.",
        extendedDescription: "Сервіс Google Trends тимчасово недоступний.",
        picture: "https://placehold.co/120x120",
    },
];

export const revalidate = 3600;

export default async function UATrending() {
    let trends: Trend[] = [];

    try {
        const data = await getGoogleTrends();
        trends = data?.length ? data : fallbackTrends;
    } catch {
        trends = fallbackTrends;
    }

    return (
        <div className="mx-auto p-6 border-2 border-dashed border-white rounded-3xl">
            <TrendingInfo/>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {trends.map((t, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl overflow-hidden shadow hover:shadow-xl transition-transform hover:scale-105 bg-white/90 dark:bg-gray-800/90 flex flex-col"
                    >
                        {t.picture && (
                            <img
                                src={t.picture}
                                alt={t.title}
                                className="w-full aspect-video object-cover"
                            />
                        )}
                        <div className="p-4 flex flex-col flex-1">
                            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                                {t.title}
                            </h2>

                            {t.traffic && (
                                <span className="inline-block mb-2 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  Трафік: {t.traffic}
                </span>
                            )}

                            {t.description && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">
                                    {t.description}
                                </p>
                            )}

                            {t.extendedDescription && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mb-3">
                                    {t.extendedDescription}
                                </p>
                            )}

                            {t.news && t.news.length > 0 && (
                                <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-2">
                                    <h3 className="font-medium mb-1 text-gray-700 dark:text-gray-300 text-sm">
                                        Новини:
                                    </h3>
                                    <div className="space-y-1 pr-1">
                                        {t.news
                                            .filter((n) => {
                                                const url = Array.isArray(n.url) ? n.url[0] : n.url;
                                                try {
                                                    const domain = new URL(url).hostname;
                                                    return !domain.endsWith(".ru");
                                                } catch {
                                                    return true;
                                                }
                                            })
                                            .map((n, nIdx) => {
                                                const title = Array.isArray(n.title)
                                                    ? n.title[0]
                                                    : n.title;
                                                const url = Array.isArray(n.url) ? n.url[0] : n.url;
                                                const domain = (() => {
                                                    try {
                                                        return new URL(url).hostname;
                                                    } catch {
                                                        return "";
                                                    }
                                                })();

                                                return (
                                                    <a
                                                        key={nIdx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                                    >
                                                        {title}
                                                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                              {domain}
                            </span>
                                                    </a>
                                                );
                                            })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
