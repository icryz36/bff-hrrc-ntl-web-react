/**
 * Mock the scrollTo method
 */
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
