import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import 'intersection-observer';
import { expect } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// Mock matchMedia with full MediaQueryList interface
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }) as MediaQueryList,
});

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
