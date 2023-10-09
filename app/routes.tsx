import * as React from "react";
import Home from "./pages/Home";
import { Outlet, Route, createRoutesFromElements } from "react-router-dom";

function SiteLayout() {
  return (
    <Outlet />
  )
}

export const allRoutes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />} />
    <Route path="architecture" lazy={() => import("./pages/architecture/Architecture")} />
    <Route path="languages" lazy={() => import("./pages/languages/Languages")} />
    <Route path="runtime" lazy={() => import("./pages/runtime/Runtime")} />
    <Route path="framework" lazy={() => import("./pages/framework/Framework")} />
    <Route path="samples" lazy={() => import("./pages/samples/Samples")} />
    <Route path="guides" lazy={() => import("./pages/guides/Guides")} />
    <Route path="docs" lazy={() => import("./pages/docs/Docs")} />
    <Route path="community" lazy={() => import("./pages/community/Community")} />
  </Route>
)

export function withRoutes(fn: any) {
  return fn(allRoutes);
}
