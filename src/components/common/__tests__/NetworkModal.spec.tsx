import { fireEvent, render, screen, waitFor } from 'test-utils';
import { NetworkModal } from '../NetworkModal';

describe('<NetworkModal />', () => {
  it('should render NetworkModal when event is triggered', async () => {
    render(<NetworkModal />);

    const event = new Event('network-offline');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('การเชื่อมต่ออินเตอร์เน็ตขัดข้อง')).toBeInTheDocument();
    });
  });

  it('should open modal when network-offline event is triggered', async () => {
    render(<NetworkModal />);

    const event = new Event('network-offline');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('การเชื่อมต่ออินเตอร์เน็ตขัดข้อง')).toBeInTheDocument();
    });
  });

  it('should close modal when Close button is clicked', async () => {
    render(<NetworkModal />);

    const event = new Event('network-offline');
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('การเชื่อมต่ออินเตอร์เน็ตขัดข้อง')).not.toBeInTheDocument();
    });
  });
});
