import type { SanityDocument } from "@sanity/client";
import { Link, useParams } from "react-router-dom";
import { client } from "~/sanity/client";
import type { Route } from "./+types/home";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id, "title": title[$lang], "slug": slug.current, publishedAt, "imageUrl": image.asset->url
}`;

export async function loader({ params }: Route.LoaderArgs) {
  const { lang } = params;
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { lang });
  return { posts };
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const { lang } = useParams();

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-6 lg:p-12 text-white">
      <header className="mb-16 space-y-2">
        <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Feed.
        </h1>
        <p className="text-gray-500 font-medium">
          Curated stories in {lang?.toUpperCase()}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/${lang}/${post.slug}`}
            className="group relative flex flex-col bg-gray-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 animate-pulse" />
              )}
            </div>
            <div className="p-6 bg-gradient-to-t from-gray-950 to-transparent">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 block">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <h2 className="text-lg font-bold leading-tight group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
