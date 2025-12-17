import { fireEvent, render, screen } from 'test-utils';
import { vi } from 'vitest';
import Editor from '../Editor';

const mockEditor = {
  getHTML: vi.fn(() => '<p>Test content</p>'),
  isEmpty: false,
  commands: {
    setContent: vi.fn(),
  },
};

vi.mock('mui-tiptap', () => ({
  RichTextEditor: ({ content, placeholder, onUpdate, onBlur }: any) => (
    <div data-testid="rich-text-editor">
      <div data-testid="editor-content">{content}</div>
      <div data-testid="editor-placeholder">{placeholder}</div>
      <button
        data-testid="update-button"
        onClick={() => {
          if (onUpdate) {
            onUpdate({ editor: mockEditor });
          }
        }}
      >
        Update
      </button>
      <button
        data-testid="update-empty-button"
        onClick={() => {
          if (onUpdate) {
            onUpdate({ editor: { ...mockEditor, isEmpty: true } });
          }
        }}
      >
        Update Empty
      </button>
      <button data-testid="blur-button" onClick={onBlur}>
        Blur
      </button>
    </div>
  ),
  MenuControlsContainer: ({ children }: any) => <div data-testid="menu-controls">{children}</div>,
  MenuButtonUndo: () => <button>Undo</button>,
  MenuButtonRedo: () => <button>Redo</button>,
  MenuButtonBold: () => <button>Bold</button>,
  MenuButtonItalic: () => <button>Italic</button>,
  MenuButtonUnderline: () => <button>Underline</button>,
  MenuButtonAlignLeft: () => <button>Align Left</button>,
  MenuButtonAlignRight: () => <button>Align Right</button>,
  MenuButtonAlignCenter: () => <button>Align Center</button>,
  MenuButtonAlignJustify: () => <button>Align Justify</button>,
  MenuButtonBulletedList: () => <button>Bulleted List</button>,
  MenuButtonOrderedList: () => <button>Ordered List</button>,
  MenuDivider: () => <div />,
}));

vi.mock('@tiptap/starter-kit', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tiptap/starter-kit')>();
  return {
    ...actual,
    default: actual.default || {},
  };
});
vi.mock('@tiptap/extension-text-align', () => ({
  default: {
    configure: vi.fn(() => ({})),
  },
}));
vi.mock('@tiptap/extension-underline', () => ({
  default: {},
}));
vi.mock('@tiptap/extension-image', () => ({
  default: {},
}));
vi.mock('@tiptap/extension-placeholder', () => ({
  default: {
    configure: vi.fn(() => ({})),
  },
}));

vi.mock('components/base/IconifyIcon', () => ({
  default: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

describe('<Editor />', () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockEditor.getHTML.mockReturnValue('<p>Test content</p>');
    mockEditor.isEmpty = false;
  });

  it('should render Editor', () => {
    render(<Editor onChange={mockOnChange} />);

    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
  });

  it('should render with value', () => {
    render(<Editor onChange={mockOnChange} value="<p>Test content</p>" />);

    expect(screen.getByTestId('editor-content')).toHaveTextContent('<p>Test content</p>');
  });

  it('should call onChange when content is updated', () => {
    render(<Editor onChange={mockOnChange} />);

    const updateButton = screen.getByTestId('update-button');
    fireEvent.click(updateButton);

    expect(mockOnChange).toHaveBeenCalledWith('<p>Test content</p>');
  });

  it('should call onChange with empty string when editor is empty', () => {
    render(<Editor onChange={mockOnChange} />);

    const updateEmptyButton = screen.getByTestId('update-empty-button');
    fireEvent.click(updateEmptyButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('should call onBlur when editor loses focus', () => {
    render(<Editor onChange={mockOnChange} onBlur={mockOnBlur} />);

    const blurButton = screen.getByTestId('blur-button');
    fireEvent.click(blurButton);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should handle invalid state', () => {
    render(<Editor onChange={mockOnChange} isValid={false} />);

    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
  });

  it('should handle valid state', () => {
    render(<Editor onChange={mockOnChange} isValid={true} />);

    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
  });
});
