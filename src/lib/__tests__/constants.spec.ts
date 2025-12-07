import { describe, it, expect } from 'vitest';
import { muiComponentBaseLink, muiComponentXLink, folderBaseLink, mainDrawerWidth } from '../constants';

describe('constants', () => {
  it('should have muiComponentBaseLink', () => {
    expect(muiComponentBaseLink).toBe('https://mui.com/material-ui');
  });

  it('should have muiComponentXLink', () => {
    expect(muiComponentXLink).toBe('https://mui.com/x');
  });

  it('should have folderBaseLink', () => {
    expect(folderBaseLink).toBe('src/docs/component-docs');
  });

  it('should have mainDrawerWidth with correct values', () => {
    expect(mainDrawerWidth.full).toBe(300);
    expect(mainDrawerWidth.slim).toBe(80);
    expect(mainDrawerWidth.collapsed).toBe(136);
    expect(mainDrawerWidth.stackedNavCollapsed).toBe(72);
  });
});

