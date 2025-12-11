import { render } from '@testing-library/react';
import { useSettingsContext } from 'providers/SettingsProvider';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RTLMode from '../RTLMode';

vi.mock('providers/SettingsProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('providers/SettingsProvider')>();
  return {
    ...actual,
    useSettingsContext: vi.fn(),
  };
});

const mockUseSettingsContext = vi.mocked(useSettingsContext);

describe('<RTLMode />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.dir = '';
  });

  it('should render children', () => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'ltr',
      },
    } as any);

    const { container } = render(
      <RTLMode>
        <div>Test Content</div>
      </RTLMode>,
    );

    expect(container.textContent).toContain('Test Content');
  });

  it('should set document.dir to ltr when textDirection is ltr', () => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'ltr',
      },
    } as any);

    render(
      <RTLMode>
        <div>Test</div>
      </RTLMode>,
    );

    expect(document.dir).toBe('ltr');
  });

  it('should set document.dir to rtl when textDirection is rtl', () => {
    mockUseSettingsContext.mockReturnValue({
      config: {
        textDirection: 'rtl',
      },
    } as any);

    render(
      <RTLMode>
        <div>Test</div>
      </RTLMode>,
    );

    expect(document.dir).toBe('rtl');
  });
});
