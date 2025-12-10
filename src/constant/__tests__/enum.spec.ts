import { describe, expect, it } from 'vitest';
import {
  GROUP_LOCATION,
  OPTION_CONFIRM,
  OPTION_GENDER,
  OPTION_HAS_EXPERIENCE,
  OPTION_SOURCE_OF_RECRUITMENT,
  OPTION_TRANSMISSION_TYPE,
  OPTION_VACANCY,
  OPTION_VEHICLE,
  OPTION_YES_NO,
} from '../enum';

describe('enum constants', () => {
  it('should have GROUP_LOCATION options', () => {
    expect(GROUP_LOCATION).toHaveLength(2);
    expect(GROUP_LOCATION[0]).toEqual({ label: 'HO', value: 'HO' });
    expect(GROUP_LOCATION[1]).toEqual({ label: 'Branch', value: 'BRANCH' });
  });

  it('should have OPTION_VACANCY options', () => {
    expect(OPTION_VACANCY).toHaveLength(2);
    expect(OPTION_VACANCY[0]).toEqual({ label: 'Replacement', value: 'Replacement' });
    expect(OPTION_VACANCY[1]).toEqual({ label: 'Additional', value: 'Additional' });
  });

  it('should have OPTION_SOURCE_OF_RECRUITMENT options', () => {
    expect(OPTION_SOURCE_OF_RECRUITMENT).toHaveLength(3);
    expect(OPTION_SOURCE_OF_RECRUITMENT[0]).toEqual({
      label: 'Internal & External',
      value: 'Internal & External',
    });
    expect(OPTION_SOURCE_OF_RECRUITMENT[1]).toEqual({
      label: 'Internal Only',
      value: 'Internal Only',
    });
    expect(OPTION_SOURCE_OF_RECRUITMENT[2]).toEqual({
      label: 'External Only',
      value: 'External Only',
    });
  });

  it('should have OPTION_YES_NO options', () => {
    expect(OPTION_YES_NO).toHaveLength(2);
    expect(OPTION_YES_NO[0]).toEqual({ label: 'มี', value: 'YES' });
    expect(OPTION_YES_NO[1]).toEqual({ label: 'ไม่มี', value: 'NO' });
  });

  it('should have OPTION_TRANSMISSION_TYPE options', () => {
    expect(OPTION_TRANSMISSION_TYPE).toHaveLength(2);
    expect(OPTION_TRANSMISSION_TYPE[0]).toEqual({ label: 'Manual', value: 'Manual' });
    expect(OPTION_TRANSMISSION_TYPE[1]).toEqual({ label: 'Automatic', value: 'Automatic' });
  });

  it('should have OPTION_HAS_EXPERIENCE options', () => {
    expect(OPTION_HAS_EXPERIENCE).toHaveLength(2);
    expect(OPTION_HAS_EXPERIENCE[0]).toEqual({ label: 'เคย', value: 'YES' });
    expect(OPTION_HAS_EXPERIENCE[1]).toEqual({ label: 'ไม่เคย', value: 'NO' });
  });

  it('should have OPTION_CONFIRM options', () => {
    expect(OPTION_CONFIRM).toHaveLength(2);
    expect(OPTION_CONFIRM[0]).toEqual({ label: 'ใช่', value: 'YES' });
    expect(OPTION_CONFIRM[1]).toEqual({ label: 'ไม่ใช่', value: 'NO' });
  });

  it('should have OPTION_GENDER options', () => {
    expect(OPTION_GENDER).toHaveLength(2);
    expect(OPTION_GENDER[0]).toEqual({ label: 'ชาย', value: 'm' });
    expect(OPTION_GENDER[1]).toEqual({ label: 'หญิง', value: 'f' });
  });

  it('should have OPTION_VEHICLE options', () => {
    expect(OPTION_VEHICLE).toHaveLength(3);
    expect(OPTION_VEHICLE[0]).toEqual({ label: 'ได้ มีใบขับขี่', value: 'yes_licensed' });
    expect(OPTION_VEHICLE[1]).toEqual({ label: 'ได้ ไม่มีใบขับขี่', value: 'yes_unlicensed' });
    expect(OPTION_VEHICLE[2]).toEqual({ label: 'ไม่ได้', value: 'no' });
  });
});



