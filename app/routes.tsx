import * as React from "react";
import Home from "./pages/Home";
import Architecture from "./pages/architecture/Architecture";
import Runtime from "./pages/runtime/Runtime";
import Framework from "./pages/framework/Framework";
import Languages from "./pages/languages/Languages";
import Samples from "./pages/samples/Samples";
import Guides from "./pages/guides/Guides";
import Docs from "./pages/docs/Docs";
import Community from "./pages/community/Community";
import { Outlet, Route, createRoutesFromElements } from "react-router-dom";

function SiteLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export const allRoutes = createRoutesFromElements(
  <Route element={<SiteLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="architecture" element={<Architecture />} />
    <Route path="languages" element={<Languages />} />
    <Route path="runtime" element={<Runtime />} />
    <Route path="framework" element={<Framework />} />
    <Route path="samples" element={<Samples />} />
    <Route path="guides" element={<Guides />} />
    <Route path="docs" element={<Docs />} />
    <Route path="community" element={<Community />} />
  </Route>
)

export function withRoutes(fn: any) {
  return fn(allRoutes);
}
