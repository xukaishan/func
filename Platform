let hasV8BreakIterator;

try {
  hasV8BreakIterator = typeof Intl !== 'undefined' && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}

const testUserAgent = (regexp) => {
  return regexp.test(navigator.userAgent);
};

export const isBrowser = typeof document === 'object' && !!document;

export const isEdge = isBrowser && testUserAgent(/(edge)/i);

export const isTrident = isBrowser && testUserAgent(/(msie|trident)/i);

export const isBlink =
  isBrowser &&
  !!(window.chrome || hasV8BreakIterator) &&
  typeof CSS !== 'undefined' &&
  !isEdge &&
  !isTrident;

export const isWebKit =
  isBrowser &&
  testUserAgent(/AppleWebKit/i) &&
  !isBlink &&
  !isEdge &&
  !isTrident;

export const isFirefox = isBrowser && testUserAgent(/(firefox|minefield)/i);

export const isSafari = isBrowser && testUserAgent(/safari/i) && isWebKit;

export const isIOS = isBrowser && testUserAgent(/iPad|iPhone|iPod/) && !('MSStream' in window);

export const isAndroid = isBrowser && testUserAgent(/android/i) && !isTrident;
