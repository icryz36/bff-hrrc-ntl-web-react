import { fireEvent, render, screen, waitFor } from 'test-utils';
import { NetworkErrorModal } from '../NetworkErrorModal';

describe('<NetworkErrorModal />', () => {
  it('should render NetworkErrorModal when event is triggered', async () => {
    render(<NetworkErrorModal />);

    const event = new Event('network-error');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('เกิดข้อผิดพลาด')).toBeInTheDocument();
    });
  });

  it('should open modal when network-error event is triggered', async () => {
    render(<NetworkErrorModal />);

    const event = new Event('network-error');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('เกิดข้อผิดพลาด')).toBeInTheDocument();
    });
  });

  it('should close modal when Close button is clicked', async () => {
    render(<NetworkErrorModal />);

    const event = new Event('network-error');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('เกิดข้อผิดพลาด')).not.toBeInTheDocument();
    });
  });
});
