import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import App from '../app/App';

export function createEmotionCache() {
    return createCache({ key: 'css' });
}

const cache = createEmotionCache();

let mount = false;
const isSsr = document.body.getAttribute('data-serving-mode') === 'ssr';
let element = document.getElementById('root');
if (!element) {
    mount = true;
    element = document.createElement('main');
    element.id = 'root';
}

// Render your React component instead
let root;
if (!isSsr) {
    root = createRoot(element);
    if (mount) {
        document.body.appendChild(element);
    }
    root.render(
        <App cache={cache} />
    );
} else {
    root = hydrateRoot(element, <App cache={cache} />);
}
