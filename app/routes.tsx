import * as React from "react";
import Home from "./pages/Home";
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
    <Route path="/" element={<Home tag={'home'} title={'Title'} />} />
    <Route path="hi" lazy={() => import("./pages/Test")} />
  </Route>
)

export function withRoutes(fn: any) {
  return fn(allRoutes);
}
