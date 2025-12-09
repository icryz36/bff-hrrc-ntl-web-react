import { describe, it, expect } from 'vitest';
import { SKILLS } from '../skills';

describe('SKILLS', () => {
  it('should be an array', () => {
    expect(Array.isArray(SKILLS)).toBe(true);
  });

  it('should have skills', () => {
    expect(SKILLS.length).toBeGreaterThan(0);
  });

  it('should have skills with required properties', () => {
    SKILLS.forEach((skill) => {
      expect(skill).toHaveProperty('skillId');
      expect(skill).toHaveProperty('skillNameTh');
      expect(skill).toHaveProperty('skillNameEn');
      expect(skill).toHaveProperty('skillCategory');
      expect(skill).toHaveProperty('skillOptionType');
      expect(skill).toHaveProperty('isSkillFreeText');
      expect(skill).toHaveProperty('skillOptions');
      expect(typeof skill.skillId).toBe('string');
      expect(typeof skill.skillNameTh).toBe('string');
      expect(typeof skill.skillNameEn).toBe('string');
      expect(typeof skill.skillCategory).toBe('string');
      expect(typeof skill.skillOptionType).toBe('string');
      expect(typeof skill.isSkillFreeText).toBe('boolean');
      expect(Array.isArray(skill.skillOptions)).toBe(true);
    });
  });

  it('should have skillOptions with required properties', () => {
    SKILLS.forEach((skill) => {
      skill.skillOptions.forEach((option) => {
        expect(option).toHaveProperty('skillOptionId');
        expect(option).toHaveProperty('skillTextTh');
        expect(option).toHaveProperty('skillTextEn');
        expect(typeof option.skillOptionId).toBe('string');
        expect(typeof option.skillTextTh).toBe('string');
        expect(typeof option.skillTextEn).toBe('string');
      });
    });
  });

  it('should have valid skillOptionType values', () => {
    const validTypes = ['Dropdown', 'Checkbox', 'Radio'];
    SKILLS.forEach((skill) => {
      expect(validTypes).toContain(skill.skillOptionType);
    });
  });

  it('should have at least one skill with isSkillFreeText true', () => {
    const freeTextSkills = SKILLS.filter((s) => s.isSkillFreeText);
    expect(freeTextSkills.length).toBeGreaterThan(0);
  });

  it('should have at least one skill with isSkillFreeText false', () => {
    const nonFreeTextSkills = SKILLS.filter((s) => !s.isSkillFreeText);
    expect(nonFreeTextSkills.length).toBeGreaterThan(0);
  });
});



