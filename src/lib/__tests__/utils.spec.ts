import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculatePercentageIncrement,
  capitalize,
  convertSize,
  cssVarRgba,
  formatNumber,
  getFileExtension,
  getFileExtensionFromUrl,
  getFileNameFromUrl,
  getItemFromStore,
  getPercentage,
  getPercentageStr,
  getRandomNumber,
  hexToRgb,
  kebabCase,
  parseRoutePath,
  removeItemFromStore,
  rgbaColor,
  secondsToHms,
  secondsToMs,
  setItemToStore,
} from '../utils';

describe('utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('parseRoutePath', () => {
    it('should parse route path correctly', () => {
      expect(parseRoutePath('/home/dashboard')).toBe('dashboard');
      expect(parseRoutePath('/users/123')).toBe('123');
      expect(parseRoutePath('/')).toBe('/');
    });
  });

  describe('getItemFromStore', () => {
    it('should get item from store', () => {
      localStorage.setItem('test-key', JSON.stringify({ value: 'test' }));
      expect(getItemFromStore('test-key')).toEqual({ value: 'test' });
    });

    it('should return defaultValue when key does not exist', () => {
      expect(getItemFromStore('non-existent', 'default')).toBe('default');
    });

    it('should return string value when JSON parse fails', () => {
      localStorage.setItem('test-key', 'invalid-json');
      expect(getItemFromStore('test-key')).toBe('invalid-json');
    });
  });

  describe('setItemToStore', () => {
    it('should set item to store', () => {
      setItemToStore('test-key', 'test-value');
      expect(localStorage.getItem('test-key')).toBe('test-value');
    });
  });

  describe('removeItemFromStore', () => {
    it('should remove item from store', () => {
      localStorage.setItem('test-key', 'test-value');
      removeItemFromStore('test-key');
      expect(localStorage.getItem('test-key')).toBeNull();
    });
  });

  describe('kebabCase', () => {
    it('should convert string to kebab case', () => {
      expect(kebabCase('Hello World')).toBe('hello-world');
      expect(kebabCase('camelCase')).toBe('camel-case');
      expect(kebabCase('snake_case')).toBe('snake-case');
    });
  });

  describe('capitalize', () => {
    it('should capitalize string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('hello-world')).toBe('Hello world');
    });
  });

  describe('getFileNameFromUrl', () => {
    it('should get file name from URL', () => {
      expect(getFileNameFromUrl('path/to/file.txt')).toBe('file');
      expect(getFileNameFromUrl('image.jpg')).toBe('image');
    });

    it('should return unknown when file name is empty', () => {
      expect(getFileNameFromUrl('')).toBe('unknown');
    });
  });

  describe('getFileExtensionFromUrl', () => {
    it('should get file extension from URL', () => {
      expect(getFileExtensionFromUrl('file.txt')).toBe('txt');
      expect(getFileExtensionFromUrl('image.jpg')).toBe('jpg');
    });
  });

  describe('getFileExtension', () => {
    it('should get file extension', () => {
      expect(getFileExtension('file.txt')).toBe('txt');
      expect(getFileExtension('image.jpg')).toBe('jpg');
    });
  });

  describe('getRandomNumber', () => {
    it('should return random number within range', () => {
      const result = getRandomNumber(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });
  });

  describe('calculatePercentageIncrement', () => {
    it('should calculate percentage increment', () => {
      expect(calculatePercentageIncrement(100, 50)).toBe(100);
      expect(calculatePercentageIncrement(50, 100)).toBe(-50);
      expect(calculatePercentageIncrement(0, 0)).toBe(0);
    });
  });

  describe('getPercentage', () => {
    it('should calculate percentage', () => {
      expect(getPercentage(50, 100)).toBe(50);
      expect(getPercentage(25, 100)).toBe(25);
    });
  });

  describe('getPercentageStr', () => {
    it('should return percentage as string', () => {
      expect(getPercentageStr(50, 100)).toBe('50%');
      expect(getPercentageStr(25, 100)).toBe('25%');
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to rgb', () => {
      expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#ff0000')).toEqual([255, 0, 0]);
    });
  });

  describe('rgbaColor', () => {
    it('should convert hex to rgba', () => {
      expect(rgbaColor('#ffffff', 0.5)).toBe('rgba(255,255,255, 0.5)');
      expect(rgbaColor('#000000', 1)).toBe('rgba(0,0,0, 1)');
    });
  });

  describe('formatNumber', () => {
    it('should format number with K suffix', () => {
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(1500)).toBe('1.5K');
    });

    it('should format number with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1M');
      expect(formatNumber(1500000)).toBe('1.5M');
    });

    it('should format number with B suffix', () => {
      expect(formatNumber(1000000000)).toBe('1B');
      expect(formatNumber(1500000000)).toBe('1.5B');
    });

    it('should return number as string when less than 1000', () => {
      expect(formatNumber(999)).toBe('999');
    });
  });

  describe('secondsToHms', () => {
    it('should convert seconds to H:M:S format', () => {
      expect(secondsToHms(3661)).toBe('1:01:01');
      expect(secondsToHms(3600)).toBe('1:00:00');
      expect(secondsToHms(60)).toBe('0:01:00');
    });
  });

  describe('secondsToMs', () => {
    it('should convert seconds to M:S format', () => {
      expect(secondsToMs(65)).toBe('1:05');
      expect(secondsToMs(125)).toBe('2:05');
      expect(secondsToMs(0)).toBe('0:00');
    });

    it('should return 0:00 for NaN', () => {
      expect(secondsToMs(NaN)).toBe('0:00');
    });
  });

  describe('convertSize', () => {
    it('should convert size from kb to mb with reversible false', () => {
      // When reversible: false, it swaps from and to
      // So from: 'kb', to: 'mb' becomes from: 'mb', to: 'kb'
      // Then calculates: 1024 * 1024^(1-2) = 1024 * 1024^(-1) = 1
      expect(convertSize(1024, { from: 'kb', to: 'mb', reversible: false })).toBe(1);
    });

    it('should convert size from mb to kb with reversible false', () => {
      // When reversible: false, it swaps from and to
      // So from: 'mb', to: 'kb' becomes from: 'kb', to: 'mb'
      // Then calculates: 1 * 1024^(2-1) = 1 * 1024 = 1024
      expect(convertSize(1, { from: 'mb', to: 'kb', reversible: false })).toBe(1024);
    });

    it('should convert size from kb to mb with reversible true', () => {
      // When reversible: true, it doesn't swap
      // from: 'kb' (index 1), to: 'mb' (index 2)
      // Calculates: 1024 * 1024^(2-1) = 1024 * 1024 = 1048576
      expect(convertSize(1024, { from: 'kb', to: 'mb', reversible: true })).toBe(1048576);
    });

    it('should convert size from mb to kb with reversible true', () => {
      // When reversible: true, it doesn't swap
      // from: 'mb' (index 2), to: 'kb' (index 1)
      // Calculates: 1 * 1024^(1-2) = 1 * 1024^(-1) = 0.0009765625
      expect(convertSize(1, { from: 'mb', to: 'kb', reversible: true })).toBeCloseTo(0.0009765625);
    });
  });

  describe('cssVarRgba', () => {
    it('should convert color to rgba format', () => {
      expect(cssVarRgba('255 255 255', 0.5)).toBe('rgba(255 255 255 / 0.5)');
      expect(cssVarRgba('0 0 0', 1)).toBe('rgba(0 0 0 / 1)');
    });
  });
});
