import { describe, expect, it } from 'vitest';
import mixins from '../mixins';

describe('mixins', () => {
  it('should have ecommerceTopbar defined', () => {
    expect(mixins.ecommerceTopbar).toBeDefined();
    expect(mixins.ecommerceTopbar?.xs).toBe(188);
    expect(mixins.ecommerceTopbar?.sm).toBe(190);
    expect(mixins.ecommerceTopbar?.md).toBe(162);
  });

  it('should have topbar defined', () => {
    expect(mixins.topbar).toBeDefined();
    expect(mixins.topbar?.default).toBeDefined();
    expect(mixins.topbar?.slim).toBeDefined();
    expect(mixins.topbar?.stacked).toBeDefined();
  });

  it('should have topbar default values', () => {
    expect(mixins.topbar?.default?.xs).toBe(64);
    expect(mixins.topbar?.default?.md).toBe(82);
  });

  it('should have topbar slim values', () => {
    expect(mixins.topbar?.slim?.xs).toBe(38);
  });

  it('should have topbar stacked values', () => {
    expect(mixins.topbar?.stacked?.xs).toBe(129);
    expect(mixins.topbar?.stacked?.md).toBe(103);
  });

  it('should have footer defined', () => {
    expect(mixins.footer).toBeDefined();
    expect(mixins.footer?.xs).toBe(72);
    expect(mixins.footer?.sm).toBe(56);
  });

  it('should have topOffset function', () => {
    expect(mixins.topOffset).toBeDefined();
    expect(typeof mixins.topOffset).toBe('function');
  });

  it('should calculate topOffset correctly', () => {
    if (!mixins.topOffset) {
      throw new Error('topOffset is not defined');
    }
    const result = mixins.topOffset({ xs: 64, md: 82 }, 10);
    expect(result.xs).toBe('74px');
    expect(result.md).toBe('92px');
  });

  it('should calculate topOffset with important flag', () => {
    if (!mixins.topOffset) {
      throw new Error('topOffset is not defined');
    }
    const result = mixins.topOffset({ xs: 64 }, 10, true);
    expect(result.xs).toBe('74px !important');
  });

  it('should have contentHeight function', () => {
    expect(mixins.contentHeight).toBeDefined();
    expect(typeof mixins.contentHeight).toBe('function');
  });

  it('should calculate contentHeight correctly', () => {
    if (!mixins.contentHeight) {
      throw new Error('contentHeight is not defined');
    }
    const result = mixins.contentHeight({ xs: 64, md: 82 }, 10);
    expect(result.xs).toBe('calc(100vh - 74px)');
    expect(result.md).toBe('calc(100vh - 92px)');
  });

  it('should calculate contentHeight with important flag', () => {
    if (!mixins.contentHeight) {
      throw new Error('contentHeight is not defined');
    }
    const result = mixins.contentHeight({ xs: 64 }, 10, true);
    expect(result.xs).toBe('calc(100vh - 74px) !important');
  });
});
