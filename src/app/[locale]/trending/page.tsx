import {getGoogleTrends} from "@/app/api/trends";

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
        <div className="mx-auto p-4 border border-dashed rounded-2xl">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Google Trends — Україна
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Це <span className="font-medium">самі останні тренди</span> українських користувачів Google у реальному
                часі.
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ви можете досліджувати актуальні теми та аналітику безпосередньо на
                <a
                    href="https://trends.google.com/trending?geo=UA&hl=uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-medium ml-1"
                >
                    офіційному сайті Google Trends
                </a>.
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Google Trends дозволяє переглядати найпопулярніші пошукові запити українських користувачів у реальному
                часі,
                аналізувати динаміку інтересу до тем, порівнювати популярність різних запитів
                та знаходити пов’язані новини. Сервіс допомагає зрозуміти актуальні тенденції,
                відстежувати сезонні зміни популярності та знаходити контент, який цікавить вашу аудиторію.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {trends.map((t, idx) => (
                    <div
                        key={idx}
                        className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
                    >
                        {t.picture && (
                            <img
                                src={t.picture}
                                alt={t.title}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <div className="p-4 flex flex-col">
                            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{t.title}</h2>

                            {t.traffic && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Трафік: {t.traffic}
                                </p>
                            )}

                            {t.pictureSource && (
                                <p className="text-xs text-gray-400 mb-2">Джерело зображення: {t.pictureSource}</p>
                            )}

                            {t.description && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{t.description}</p>
                            )}

                            {t.extendedDescription && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">{t.extendedDescription}</p>
                            )}

                            {t.news && t.news.length > 0 && (
                                <div className="mt-2">
                                    <h3 className="font-medium mb-1 text-gray-700 dark:text-gray-300">Новини:</h3>
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
                                            const title = Array.isArray(n.title) ? n.title[0] : n.title;
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
                                                    className="block mb-2 text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    {title}
                                                    <div className="text-gray-500 dark:text-gray-400 text-xs text-right">
                                                        ({domain})
                                                    </div>
                                                </a>
                                            );
                                        })}

                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
