// src/createEmotionCache.ts

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
// https://tech.sycamore.garden/material-ui-next-js-typescript#heading-install-material-ui