import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fDate, fDateTime, fTimestamp, fToNow } from '../format-time';

vi.mock('dayjs', () => {
  const mockFormat = vi.fn((format: string) => {
    if (format === 'DD/MM/YYYY') return '15/01/2024';
    if (format === 'DD MMM YYYY h:mm A') return '15 Jan 2024 10:30 AM';
    return 'formatted';
  });

  const mockValueOf = vi.fn(() => 1705312200000);
  const mockFromNow = vi.fn(() => '2 hours ago');

  const mockDayjs = vi.fn((date: any) => ({
    format: mockFormat,
    valueOf: mockValueOf,
    fromNow: mockFromNow,
  }));

  return {
    default: mockDayjs,
  };
});

describe('format-time', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fDate', () => {
    it('should format date with default format', () => {
      const result = fDate('2024-01-15');
      expect(result).toBe('15/01/2024');
    });

    it('should format date with custom format', () => {
      const result = fDate('2024-01-15', 'YYYY-MM-DD');
      expect(result).toBe('formatted');
    });

    it('should return empty string for null', () => {
      const result = fDate(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined', () => {
      const result = fDate(undefined);
      expect(result).toBe('');
    });

    it('should handle Date object', () => {
      const date = new Date('2024-01-15');
      const result = fDate(date);
      expect(result).toBe('15/01/2024');
    });

    it('should handle number timestamp', () => {
      const result = fDate(1705312200000);
      expect(result).toBe('15/01/2024');
    });
  });

  describe('fDateTime', () => {
    it('should format date time with default format', () => {
      const result = fDateTime('2024-01-15T10:30:00');
      expect(result).toBe('15 Jan 2024 10:30 AM');
    });

    it('should format date time with custom format', () => {
      const result = fDateTime('2024-01-15T10:30:00', 'YYYY-MM-DD HH:mm');
      expect(result).toBe('formatted');
    });

    it('should return empty string for null', () => {
      const result = fDateTime(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined', () => {
      const result = fDateTime(undefined);
      expect(result).toBe('');
    });
  });

  describe('fTimestamp', () => {
    it('should convert date to timestamp', () => {
      const result = fTimestamp('2024-01-15');
      expect(result).toBe(1705312200000);
    });

    it('should return empty string for null', () => {
      const result = fTimestamp(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined', () => {
      const result = fTimestamp(undefined);
      expect(result).toBe('');
    });
  });

  describe('fToNow', () => {
    it('should format date to relative time', () => {
      const result = fToNow('2024-01-15');
      expect(result).toBe('2 hours ago');
    });

    it('should return empty string for null', () => {
      const result = fToNow(null);
      expect(result).toBe('');
    });

    it('should return empty string for undefined', () => {
      const result = fToNow(undefined);
      expect(result).toBe('');
    });
  });
});

