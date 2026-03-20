import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("../layouts/Layout.tsx", [
    route("/", "../../pages/StubPage/StubPage.tsx", { id: "home" }), // корневой маршрут внутри layout
    route("play", "../../pages/StubPage/StubPage.tsx", { id: "play" }),
    route("search", "../../pages/StubPage/StubPage.tsx", { id: "search" }),
    route("schedule", "../../pages/EventsPage/EventsPage.tsx"),
    route("dating", "../../pages/DatingPage/DatingPage.tsx"),
    route("info", "../../pages/StubPage/StubPage.tsx", { id: "info" }),
  ]),
] satisfies RouteConfig;
