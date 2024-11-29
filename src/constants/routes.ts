import { lazy } from "react";

const importComponent = (path: string) => {
  return lazy(() => import(`../components/${path}/index.tsx`));
};

export const routes = [
  {
    path: "/",
    Component: importComponent("posts"),
  },
  {
    path: "/posts",
    Component: importComponent("posts"),
  },
  {
    path: "/posts/view/:id",
    Component: importComponent("post-view"),
  },
  {
    path: "/posts/add",
    Component: importComponent("add-post"),
  },
  {
    path: "/posts/edit/:id",
    Component: importComponent("add-post"),
  },
];
