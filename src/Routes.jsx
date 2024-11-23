import { lazy } from "react";
const HomePage = lazy(() => import("Pages/HomePage"));
const NotFoundPage = lazy(() => import("Pages/NotFoundPage"));

export const routes = [
  {
    path: "*",
    component: <NotFoundPage />,
  },
  {
    path: "/",
    component: <HomePage />,
  },
];
