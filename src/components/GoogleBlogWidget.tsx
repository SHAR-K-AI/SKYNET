import React from "react";
import { useTranslations } from "next-intl";
import {
    NewspaperIcon,
    ClockIcon,
    DocumentTextIcon,
    ArrowTopRightOnSquareIcon,
    TagIcon,
    UserIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";
import AppImage from "@/components/Image";

type Post = {
    title?: string;
    link?: string;
    pubDate?: string;
    contentSnippet?: string;
    guid?: string;
    "media:content"?: { $: { url: string } };
    "media:description"?: string;
    categories?: string[];
    author?: { name?: string; title?: string };
    og?: { site_name?: string };
};

type WidgetProps = {
    posts: Post[];
    loading?: boolean;
};

const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString() : "";

const SkeletonPostCard = () => (
    <li className="p-5 border border-gray-200 rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 animate-pulse shadow-md">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-full" />
    </li>
);

const BlogPostCard = ({ post }: { post: Post }) => {
    const imageUrl = post["media:content"]?.$?.url ?? null;
    const categories = post.categories ?? [];

    return (
        <li
            key={post.guid || post.link}
            className="p-5 border border-gray-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300
                 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-blue-700
                 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                 cursor-pointer group relative space-y-3"
        >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowTopRightOnSquareIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>

            <a href={post.link} target="_blank" rel="noopener noreferrer">
                <div className="flex items-start mb-2">
                    <NewspaperIcon className="h-6 w-6 text-blue-500 dark:text-blue-300 flex-shrink-0 mt-1 mr-2" />
                    <h3 className="text-xl font-bold text-blue-600 group-hover:text-blue-800
                         dark:text-blue-300 dark:group-hover:text-blue-100 hover:underline">
                        {post.title}
                    </h3>
                </div>
            </a>

            {post.pubDate && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    {formatDate(post.pubDate)}
                </div>
            )}

            {imageUrl && (
                <AppImage
                    width={900}
                    src={imageUrl}
                    className="rounded-xl max-h-60 w-full object-cover shadow-md"
                    alt={post["media:description"] || post.title || "Google Blog image"}
                />
            )}

            {post.contentSnippet && (
                <div className="flex items-start">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1 mr-2" />
                    <p className="text-gray-700 mt-1 line-clamp-3 dark:text-gray-300">
                        {post.contentSnippet}
                    </p>
                </div>
            )}

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((cat, i) => (
                        <span
                            key={i}
                            className="flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full
                         dark:bg-blue-800 dark:text-blue-200"
                        >
                            <TagIcon className="h-3 w-3 mr-1" />
                                {cat}
                        </span>
                    ))}
                </div>
            )}

            {post.author?.name && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <UserIcon className="h-4 w-4 mr-1" />
                    {post.author.name}
                    {post.author.title && ` — ${post.author.title}`}
                </div>
            )}

            {post.og?.site_name && (
                <div className="flex items-center text-xs text-gray-400 mt-1">
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    {post.og.site_name}
                </div>
            )}
        </li>
    );
};

// ---- main ----
export default function GoogleBlogWidget({ posts, loading = false }: WidgetProps) {
    const t = useTranslations("GoogleBlogWidget");

    return (
        <div className="space-y-10 p-6 rounded-2xl mx-auto max-w-4xl border-2 border-dashed border-white">
            <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 dark:text-blue-400 drop-shadow-md">
                {t("title")}
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
                {t("description")}
            </p>

            {/* Google UA button */}
            <div className="mb-6 text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    {t("uaBlog")}
                </p>
                <a
                    href="https://ukraine.googleblog.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg
                     transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                     dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">G</span>
                    <span className="text-xl font-bold tracking-tight text-red-600 dark:text-red-400">o</span>
                    <span className="text-xl font-bold tracking-tight text-yellow-600 dark:text-yellow-400">o</span>
                    <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">g</span>
                    <span className="text-xl font-bold tracking-tight text-green-600 dark:text-green-400">l</span>
                    <span className="text-xl font-bold tracking-tight text-red-600 dark:text-red-400">e</span>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg ml-2">
            {t("googleUa")}
          </span>
                    <ArrowTopRightOnSquareIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 ml-2" />
                </a>
            </div>

            <ul className="space-y-5">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonPostCard key={i} />)
                    : posts.map((post) => <BlogPostCard key={post.guid || post.link} post={post} />)}
            </ul>
        </div>
    );
}
