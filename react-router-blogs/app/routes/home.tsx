import type { SanityDocument } from "@sanity/client";
import { Link, useParams } from "react-router-dom";
import { client } from "~/sanity/client";
import type { Route } from "./+types/home";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  "title": title[$lang],
  "slug": slug.current, 
  publishedAt
}`;

export async function loader({ params }: Route.LoaderArgs) {
  const { lang } = params;
  if (!lang) {
    throw new Response("Language parameter missing.", { status: 400 });
  }
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { lang });
  return { posts };
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const { lang } = useParams();
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link to={`/${lang}/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <p>
            No posts found for this language. Try creating one in Sanity Studio!
          </p>
        )}
      </ul>
    </main>
  );
}
