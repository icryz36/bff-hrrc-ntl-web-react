import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { render, screen } from 'test-utils';
import { UnsavedChangesGuard } from '../unsaved-changes-guard';

const { mockBlocker, mockUseBlocker, mockUseFormState } = vi.hoisted(() => ({
  mockBlocker: {
    state: 'unblocked',
    reset: vi.fn(),
    proceed: vi.fn(),
  },
  mockUseBlocker: vi.fn(),
  mockUseFormState: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useBlocker: mockUseBlocker,
  };
});

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');
  return {
    ...actual,
    useFormState: mockUseFormState,
  };
});

describe('UnsavedChangesGuard', () => {
  const setup = ({
    isDirty,
    isSubmitSuccess,
  }: {
    isDirty?: boolean;
    isSubmitSuccess?: boolean;
  }) => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
      const methods = useForm({});

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    mockUseFormState.mockReturnValue({
      isDirty: !!isDirty,
    });

    mockUseBlocker.mockReturnValue(mockBlocker);

    const args = render(
      <Wrapper>
        <UnsavedChangesGuard isSubmitSuccess={isSubmitSuccess} />
      </Wrapper>,
    );

    return { ...args };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockBlocker.state = 'unblocked';
  });

  it('should render UnsavedChangesGuard without dialog when unblocked', () => {
    setup({});

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    expect(screen.queryByText('ยืนยันการออกจากหน้านี้')).not.toBeInTheDocument();
    expect(screen.queryByText('/คุณต้องการออกจากหน้านี้หรือไม่/')).not.toBeInTheDocument();
  });

  it('should render UnsavedChangesGuard when state is blocked ', () => {
    mockBlocker.state = 'blocked';
    setup({});

    expect(screen.queryByText('Cancel')).toBeInTheDocument();
    expect(screen.queryByText('Confirm')).toBeInTheDocument();
    expect(screen.queryByText('ยืนยันการออกจากหน้านี้')).toBeInTheDocument();
  });

  it('should call blocker reset when user click cancel', async () => {
    mockBlocker.state = 'blocked';

    const { user } = setup({});

    const btnCancel = screen.getByRole('button', { name: /cancel/i });

    await user.click(btnCancel);

    expect(mockBlocker.reset).toHaveBeenCalledOnce();
  });

  it('should call blocker proceed when user click confirm', async () => {
    mockBlocker.state = 'blocked';

    const { user } = setup({});

    const btnConfirm = screen.getByRole('button', { name: /confirm/i });

    await user.click(btnConfirm);

    expect(mockBlocker.proceed).toHaveBeenCalledOnce();
  });

  it('should not block when isSubmitSuccess is true', () => {
    setup({ isDirty: true, isSubmitSuccess: true });

    const blockerFn = mockUseBlocker.mock.calls[0][0];

    const result = blockerFn({
      currentLocation: { pathname: '/current' },
      nextLocation: { pathname: '/next' },
    });

    expect(result).toBe(false);
  });

  it('should not block when form is not dirty', () => {
    setup({ isDirty: false });

    const blockerFn = mockUseBlocker.mock.calls[0][0];

    const result = blockerFn({
      currentLocation: { pathname: '/current' },
      nextLocation: { pathname: '/next' },
    });

    expect(result).toBe(false);
  });

  it('should block when dirty and pathname is different', () => {
    setup({ isDirty: true, isSubmitSuccess: false });

    const blockerFn = mockUseBlocker.mock.calls[0][0];

    const result = blockerFn({
      currentLocation: { pathname: '/current' },
      nextLocation: { pathname: '/next' },
    });

    expect(result).toBe(true);
  });
});
