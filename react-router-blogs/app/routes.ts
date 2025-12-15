// ./routes.ts (FINAL FIX)

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/_index.tsx"),

  route("/:lang", "routes/LangLayout.tsx", [
    index("routes/home.tsx"),
    route(":slug", "routes/post.tsx"),
  ]),
] satisfies RouteConfig;
