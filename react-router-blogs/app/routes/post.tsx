import { Link } from "react-router";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import type { Route } from "../+types/root";
import { client } from "~/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export async function loader({ params }: Route.LoaderArgs) {
  return { post: await client.fetch<SanityDocument>(POST_QUERY, params) };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return <h1>Error: Data not loaded.</h1>;
  }
  const { post } = loaderData as { post: SanityDocument | undefined | null };

  if (!post) {
    return <h1>404 Post Not Found</h1>;
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link to="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
