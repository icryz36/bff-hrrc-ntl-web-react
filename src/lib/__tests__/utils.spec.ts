import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculatePercentageIncrement,
  capitalize,
  convertFileToAttachment,
  convertSize,
  convertSpacesToTabs,
  cssVarRgba,
  currencyFormat,
  formatNumber,
  generatePaletteChannel,
  generateUniqueId,
  getCurrencySymbol,
  getDates,
  getFileExtension,
  getFileExtensionFromUrl,
  getFileIcon,
  getFileNameFromUrl,
  getItemFromStore,
  getNumbersInRange,
  getPastDates,
  getPercentage,
  getPercentageStr,
  getPreviousMonths,
  getRandomNumber,
  hexToRgb,
  isImageFile,
  kebabCase,
  kebabToSentenceCase,
  kebabToTitleCase,
  maskCardNumber,
  numberFormat,
  parseRoutePath,
  removeItemFromStore,
  rgbaColor,
  secondsToHms,
  secondsToMs,
  setItemToStore,
  toEndOfDay,
  toSentenceCase,
  toTitleCase,
  transformTSCode,
} from '../utils';

describe('utils', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock URL.createObjectURL for test environment
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test');
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

  describe('getDates', () => {
    it('should generate dates array with default interval', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-03');
      const dates = getDates(startDate, endDate);
      expect(dates.length).toBe(3);
      expect(dates[0].toISOString().split('T')[0]).toBe('2024-01-01');
      expect(dates[2].toISOString().split('T')[0]).toBe('2024-01-03');
    });

    it('should generate dates array with custom interval', () => {
      const startDate = new Date('2024-01-01T00:00:00');
      const endDate = new Date('2024-01-01T02:00:00');
      const interval = 1000 * 60 * 60; // 1 hour
      const dates = getDates(startDate, endDate, interval);
      expect(dates.length).toBe(3);
    });
  });

  describe('getPastDates', () => {
    it('should get past dates for week', () => {
      const dates = getPastDates('week');
      expect(dates.length).toBe(7);
    });

    it('should get past dates for month', () => {
      const dates = getPastDates('month');
      expect(dates.length).toBe(30);
    });

    it('should get past dates for year', () => {
      const dates = getPastDates('year');
      expect(dates.length).toBe(365);
    });

    it('should get past dates for custom number of days', () => {
      const dates = getPastDates(10);
      expect(dates.length).toBe(10);
    });
  });

  describe('getPreviousMonths', () => {
    it('should get previous months with default length', () => {
      const months = getPreviousMonths();
      expect(months.length).toBe(12);
      expect(Array.isArray(months)).toBe(true);
    });

    it('should get previous months with custom length', () => {
      const months = getPreviousMonths(6);
      expect(months.length).toBe(6);
    });
  });

  describe('currencyFormat', () => {
    it('should format currency with default locale and options', () => {
      const result = currencyFormat(1234.56);
      expect(result).toContain('1,234.56');
    });

    it('should format currency with custom locale', () => {
      const result = currencyFormat(1234.56, 'th-TH');
      expect(typeof result).toBe('string');
    });

    it('should format currency with custom options', () => {
      const result = currencyFormat(1234.56, 'en-US', { currency: 'EUR' });
      expect(typeof result).toBe('string');
    });
  });

  describe('getCurrencySymbol', () => {
    it('should get currency symbol for USD', () => {
      const symbol = getCurrencySymbol('USD');
      expect(symbol).toBe('$');
    });

    it('should get currency symbol for EUR', () => {
      const symbol = getCurrencySymbol('EUR');
      expect(typeof symbol).toBe('string');
    });

    it('should handle valid currency codes', () => {
      const symbol = getCurrencySymbol('THB');
      expect(typeof symbol).toBe('string');
    });
  });

  describe('getNumbersInRange', () => {
    it('should get numbers in range', () => {
      expect(getNumbersInRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getNumbersInRange(0, 3)).toEqual([0, 1, 2, 3]);
    });

    it('should handle single number range', () => {
      expect(getNumbersInRange(5, 5)).toEqual([5]);
    });
  });

  describe('numberFormat', () => {
    it('should format number with default locale', () => {
      expect(numberFormat(1234.56)).toBe('1,234.56');
    });

    it('should format number with custom locale', () => {
      const result = numberFormat(1234.56, 'th-TH');
      expect(typeof result).toBe('string');
    });

    it('should format number with custom options', () => {
      const result = numberFormat(1234.56, 'en-US', { notation: 'compact' });
      expect(typeof result).toBe('string');
    });
  });

  describe('transformTSCode', () => {
    it('should transform TypeScript code to JavaScript', () => {
      const tsCode = 'const x: number = 5;';
      const result = transformTSCode(tsCode);
      expect(typeof result).toBe('string');
      expect(result).toContain('const x = 5');
    });

    it('should transform JSX code', () => {
      const tsCode = 'const Component = () => <div>Hello</div>;';
      const result = transformTSCode(tsCode);
      expect(typeof result).toBe('string');
    });
  });

  describe('convertSpacesToTabs', () => {
    it('should convert spaces to tabs', () => {
      const str = '    const x = 5;';
      const result = convertSpacesToTabs(str);
      expect(result).toContain('\t');
    });

    it('should handle multiple lines', () => {
      const str = '  line1\n    line2';
      const result = convertSpacesToTabs(str);
      expect(result.split('\n').length).toBe(2);
    });
  });

  describe('kebabToSentenceCase', () => {
    it('should convert kebab case to sentence case', () => {
      expect(kebabToSentenceCase('hello-world')).toBe('Hello world');
      expect(kebabToSentenceCase('test-case-example')).toBe('Test case example');
    });
  });

  describe('kebabToTitleCase', () => {
    it('should convert kebab case to title case', () => {
      expect(kebabToTitleCase('hello-world')).toBe('Hello World');
      expect(kebabToTitleCase('test-case-example')).toBe('Test Case Example');
    });
  });

  describe('toSentenceCase', () => {
    it('should convert string to sentence case', () => {
      expect(toSentenceCase('helloWorld')).toBe('Hello world');
      expect(toSentenceCase('hello_world')).toBe('Hello world');
      expect(toSentenceCase('hello-world')).toBe('Hello world');
    });
  });

  describe('toTitleCase', () => {
    it('should convert string to title case', () => {
      expect(toTitleCase('helloWorld')).toBe('Hello World');
      expect(toTitleCase('hello_world')).toBe('Hello World');
      expect(toTitleCase('hello-world')).toBe('Hello World');
    });
  });

  describe('isImageFile', () => {
    it('should return true for image files', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      expect(isImageFile(file)).toBe(true);
    });

    it('should return true for PNG files', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      expect(isImageFile(file)).toBe(true);
    });

    it('should return false for non-image files', () => {
      const file = new File([''], 'test.txt', { type: 'text/plain' });
      expect(isImageFile(file)).toBe(false);
    });
  });

  describe('convertFileToAttachment', () => {
    it('should convert File to attachment', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const attachment = convertFileToAttachment(file);
      expect(attachment.name).toBe('test.jpg');
      expect(attachment.format).toBe('jpg');
      expect(attachment.size).toBeDefined();
    });

    it('should convert remote file to attachment', () => {
      const remoteFile = {
        name: 'remote.jpg',
        url: 'https://example.com/image.jpg',
      };
      const attachment = convertFileToAttachment(remoteFile as any);
      expect(attachment.name).toBe('remote.jpg');
      expect(attachment.preview).toBe('https://example.com/image.jpg');
      expect(attachment.format).toBe('jpg');
    });
  });

  describe('maskCardNumber', () => {
    it('should mask card number', () => {
      expect(maskCardNumber('1234 5678 9012 3456')).toBe('**** **** **** 3456');
      expect(maskCardNumber('1234 5678')).toBe('**** 5678');
    });

    it('should handle single group', () => {
      expect(maskCardNumber('1234')).toBe('1234');
    });
  });

  describe('getFileIcon', () => {
    it('should return icon for zip files', () => {
      expect(getFileIcon('zip')).toBe('material-symbols:folder-zip-outline-rounded');
      expect(getFileIcon('rar')).toBe('material-symbols:folder-zip-outline-rounded');
    });

    it('should return icon for text files', () => {
      expect(getFileIcon('txt')).toBe('material-symbols:text-snippet-outline-rounded');
    });

    it('should return icon for PDF files', () => {
      expect(getFileIcon('pdf')).toBe('material-symbols:picture-as-pdf-outline-rounded');
    });

    it('should return icon for image files', () => {
      expect(getFileIcon('jpg')).toBe('material-symbols:imagesmode-outline-rounded');
      expect(getFileIcon('png')).toBe('material-symbols:imagesmode-outline-rounded');
    });

    it('should return default icon for unknown format', () => {
      expect(getFileIcon('unknown')).toBe('material-symbols:lab-profile-outline-rounded');
    });
  });

  describe('generateUniqueId', () => {
    it('should generate unique ID', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    it('should generate ID with uppercase characters', () => {
      const id = generateUniqueId();
      expect(id).toBe(id.toUpperCase());
    });
  });

  describe('generatePaletteChannel', () => {
    it('should generate palette channels', () => {
      const palette = {
        primary: '#1976d2',
        secondary: '#dc004e',
      };
      const result = generatePaletteChannel(palette);
      expect(result.primary).toBe('#1976d2');
      expect(result.secondary).toBe('#dc004e');
      expect(result.primaryChannel).toBeDefined();
      expect(result.secondaryChannel).toBeDefined();
    });

    it('should handle undefined color values', () => {
      const palette = {
        primary: '#1976d2',
        secondary: undefined,
      };
      const result = generatePaletteChannel(palette);
      expect(result.primary).toBe('#1976d2');
      expect(result.primaryChannel).toBeDefined();
    });
  });

  describe('toEndOfDay', () => {
    it('should convert ISO string to end of day', () => {
      const result = toEndOfDay('2024-01-01T00:00:00Z');
      expect(result).toContain('2024-01-01');
      expect(result).toContain('23:59:00');
    });
  });
});
