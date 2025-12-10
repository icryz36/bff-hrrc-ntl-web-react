import { render, screen } from 'test-utils';
import { StyledTypographyLine } from '../StyledFontLine';

describe('StyledTypographyLine', () => {
  it('should render StyledTypographyLine', () => {
    render(<StyledTypographyLine>Test Text</StyledTypographyLine>);

    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('should render with default line prop', () => {
    render(<StyledTypographyLine>Test Text</StyledTypographyLine>);

    const element = screen.getByText('Test Text');
    expect(element).toBeInTheDocument();
  });

  it('should render with custom line prop', () => {
    render(<StyledTypographyLine line={2}>Test Text</StyledTypographyLine>);

    const element = screen.getByText('Test Text');
    expect(element).toBeInTheDocument();
  });

  it('should render with line prop set to 3', () => {
    render(<StyledTypographyLine line={3}>Long text that should be truncated</StyledTypographyLine>);

    const element = screen.getByText('Long text that should be truncated');
    expect(element).toBeInTheDocument();
  });
});




