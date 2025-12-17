import { Link, useParams } from "react-router-dom";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { client } from "~/sanity/client";
import type { Route } from "./+types/post";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function loader({ params }: Route.LoaderArgs) {
  const { lang, slug } = params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ "title": title[$lang], "body": body[$lang], publishedAt, image }`,
    { lang, slug }
  );
  if (!post) throw new Response("Not Found", { status: 404 });
  return { post };
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const { lang } = useParams();

  return (
    <article className="min-h-screen text-gray-200 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link
          to={`/${lang}`}
          className="text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-2 mb-12"
        >
          <span>←</span> ALL POSTS
        </Link>

        <header className="mb-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 border-l-2 border-blue-600 pl-6 py-2">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
              Published {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </header>

        {post.image && (
          <img
            src={urlFor(post.image)?.width(1200).url() || ""}
            className="rounded-3xl border border-white/10 mb-16 shadow-2xl"
            alt=""
          />
        )}

        <div
          className="prose prose-invert prose-blue prose-lg max-w-none 
          prose-headings:text-white prose-p:text-gray-400 prose-p:leading-relaxed 
          prose-strong:text-white prose-code:text-blue-400"
        >
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  );
}
