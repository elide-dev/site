import * as React from "react";
import Home from "./pages/Home";

export const allRoutes = [
  {
    path: "/",
    element: <Home />,
  },
];

export function withRoutes(fn: any) {
  return fn(allRoutes);
}
