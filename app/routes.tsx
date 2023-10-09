import * as React from "react";
import Home from "./pages/Home";
import Test2 from "./pages/Test2";
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
    <Route path="hi" lazy={() => import("./pages/Test")} />
    <Route path="yo" element={<Test2 />} />
  </Route>
)

export function withRoutes(fn: any) {
  return fn(allRoutes);
}
