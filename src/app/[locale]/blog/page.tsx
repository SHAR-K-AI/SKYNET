import GoogleBlogWidget from "@/components/GoogleBlogWidget";
import {getGoogleBlogPosts} from "@/app/api/rss";

export const revalidate = 3600;

export default async function GoogleBlogPage() {
    const posts = await getGoogleBlogPosts();

    return (
        <main className="py-8 min-h-screen">
            <GoogleBlogWidget posts={posts} />
        </main>
    );
}