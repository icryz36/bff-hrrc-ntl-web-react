import { describe, it, expect } from 'vitest';
import { QUSETIONS } from '../question';

describe('QUSETIONS', () => {
  it('should be an array', () => {
    expect(Array.isArray(QUSETIONS)).toBe(true);
  });

  it('should have questions', () => {
    expect(QUSETIONS.length).toBeGreaterThan(0);
  });

  it('should have questions with required properties', () => {
    QUSETIONS.forEach((question) => {
      expect(question).toHaveProperty('questionId');
      expect(question).toHaveProperty('questionTextTh');
      expect(question).toHaveProperty('questionTextEn');
      expect(question).toHaveProperty('isRequired');
      expect(question).toHaveProperty('questionOptions');
      expect(typeof question.questionId).toBe('string');
      expect(typeof question.questionTextTh).toBe('string');
      expect(typeof question.questionTextEn).toBe('string');
      expect(typeof question.isRequired).toBe('boolean');
      expect(Array.isArray(question.questionOptions)).toBe(true);
    });
  });

  it('should have questionOptions with required properties', () => {
    QUSETIONS.forEach((question) => {
      question.questionOptions.forEach((option) => {
        expect(option).toHaveProperty('optionId');
        expect(option).toHaveProperty('optionTextTh');
        expect(option).toHaveProperty('optionTextEn');
        expect(option).toHaveProperty('optionScore');
        expect(typeof option.optionId).toBe('string');
        expect(typeof option.optionTextTh).toBe('string');
        expect(typeof option.optionTextEn).toBe('string');
        expect(typeof option.optionScore).toBe('number');
      });
    });
  });

  it('should have at least one question with isRequired true', () => {
    const requiredQuestions = QUSETIONS.filter((q) => q.isRequired);
    expect(requiredQuestions.length).toBeGreaterThan(0);
  });

  it('should have at least one question with isRequired false', () => {
    const optionalQuestions = QUSETIONS.filter((q) => !q.isRequired);
    expect(optionalQuestions.length).toBeGreaterThan(0);
  });
});



