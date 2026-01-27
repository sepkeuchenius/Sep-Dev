import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects.tsx"),
  route("multicopy", "routes/multicopy.tsx"),
  route("multicopy-privacy", "routes/multicopy-privacy.tsx"),
] satisfies RouteConfig;
