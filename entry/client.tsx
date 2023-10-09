import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import createCache from "@emotion/cache";
import { withRoutes } from "../app/routes";
import App from "../app/App";

import { elementId, elementType } from "../app/dom";

export function createEmotionCache() {
  return createCache({ key: "css" });
}

console.log('Building Emotion cache');

const cache = createEmotionCache();

console.log('Building router');

const router = withRoutes(createBrowserRouter);
const page = document.location.pathname;

let mount = false;
const isSsr = document.body.getAttribute("data-serving-mode") === "ssr";
let element = document.getElementById(elementId);
if (!element) {
  mount = true;
  element = document.createElement(elementType);
  element.id = "root";
}

// Render your React component instead
let root;
if (!isSsr) {
  console.log('Rendering in CSR mode');
  root = createRoot(element);
  if (mount) {
    document.body.appendChild(element);
  }
  root.render(
    <App cache={cache} router={router} location={page} />
  );
} else {
  console.log('Rendering in SSR mode');
  root = hydrateRoot(element, (
    <App cache={cache} router={router} location={page} />
  ));
}
