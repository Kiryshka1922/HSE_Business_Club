import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  layout("../layouts/Layout.tsx", [
    index("./home.tsx"),
    route("play", "../../pages/StubPage/StubPage.tsx", { id: "play" }),
    route("search", "../../pages/StubPage/StubPage.tsx", { id: "search" }),
    route("schedule", "../../pages/EventsPage/EventsPage.tsx"),
    route("dating", "../../pages/DatingPage/DatingPage.tsx"),
    route("info", "../../pages/StubPage/StubPage.tsx", { id: "info" }),
  ]),
] satisfies RouteConfig;
