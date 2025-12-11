import { describe, expect, it } from 'vitest';
import { schemaHelper } from '../schema-helper';

describe('schemaHelper', () => {
  describe('phoneNumber', () => {
    it('should validate phone number with default message', () => {
      const schema = schemaHelper.phoneNumber();
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should validate phone number with custom message', () => {
      const schema = schemaHelper.phoneNumber({
        message: {
          required_error: 'Custom required error',
        },
      });
      const result = schema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should validate phone number with isValidPhoneNumber', () => {
      const isValidPhoneNumber = (text: string) => text.length >= 10;
      const schema = schemaHelper.phoneNumber({ isValidPhoneNumber });
      const result = schema.safeParse('1234567890');
      expect(result.success).toBe(true);
    });
  });

  describe('editor', () => {
    it('should validate editor with default message', () => {
      const schema = schemaHelper.editor();
      const result = schema.safeParse('short');
      expect(result.success).toBe(false);
    });

    it('should validate editor with custom message', () => {
      const schema = schemaHelper.editor({
        message: {
          required_error: 'Custom editor error',
        },
      });
      const result = schema.safeParse('short');
      expect(result.success).toBe(false);
    });
  });

  describe('objectOrNull', () => {
    it('should validate objectOrNull with default message', () => {
      const schema = schemaHelper.objectOrNull<{ id: string }>();
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should validate objectOrNull with custom message', () => {
      const schema = schemaHelper.objectOrNull<{ id: string }>({
        message: {
          required_error: 'Custom object error',
        },
      });
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
    });
  });

  describe('boolean', () => {
    it('should validate boolean with default message', () => {
      const schema = schemaHelper.boolean();
      const result = schema.safeParse(false);
      expect(result.success).toBe(false);
    });

    it('should validate boolean with custom message', () => {
      const schema = schemaHelper.boolean({
        message: {
          required_error: 'Custom boolean error',
        },
      });
      const result = schema.safeParse(false);
      expect(result.success).toBe(false);
    });
  });

  describe('file', () => {
    it('should validate file with default message', () => {
      const schema = schemaHelper.file();
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should validate file with custom message', () => {
      const schema = schemaHelper.file({
        message: {
          required_error: 'Custom file error',
        },
      });
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
    });
  });

  describe('files', () => {
    it('should validate files with default message', () => {
      const schema = schemaHelper.files();
      const result = schema.safeParse([]);
      expect(result.success).toBe(false);
    });

    it('should validate files with custom message', () => {
      const schema = schemaHelper.files({
        message: {
          required_error: 'Custom files error',
        },
      });
      const result = schema.safeParse([]);
      expect(result.success).toBe(false);
    });

    it('should validate files with minFiles', () => {
      const schema = schemaHelper.files({ minFiles: 3 });
      const result = schema.safeParse(['file1', 'file2']);
      expect(result.success).toBe(false);
    });
  });
});
