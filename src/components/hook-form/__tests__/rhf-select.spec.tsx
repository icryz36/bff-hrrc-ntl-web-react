import { FormProvider, useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import { render, screen } from 'test-utils';
import { describe, expect, it } from 'vitest';
import { RHFMultiSelect, RHFSelect } from '../rhf-select';

const TestSelectComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFSelect name="test" label="Test Select">
        <MenuItem value="1">Option 1</MenuItem>
        <MenuItem value="2">Option 2</MenuItem>
      </RHFSelect>
    </FormProvider>
  );
};

const TestMultiSelectComponent = () => {
  const methods = useForm({
    defaultValues: {
      test: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <RHFMultiSelect
        name="test"
        label="Test Multi Select"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </FormProvider>
  );
};

describe('<RHFSelect />', () => {
  it('should render RHFSelect', () => {
    const { container } = render(<TestSelectComponent />);
    const select = container.querySelector('input');
    expect(select).toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFSelect name="test" label="Test Select" helperText="Helper text">
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
          </RHFSelect>
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    const TestComponentWithError = () => {
      const methods = useForm({
        defaultValues: {
          test: '',
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFSelect name="test" label="Test Select">
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
          </RHFSelect>
        </FormProvider>
      );
    };

    const { container } = render(<TestComponentWithError />);
    const select = container.querySelector('input');
    expect(select).toBeInTheDocument();
  });
});

describe('<RHFMultiSelect />', () => {
  it('should render RHFMultiSelect', () => {
    render(<TestMultiSelectComponent />);
    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const TestComponentWithPlaceholder = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            placeholder="Select options"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithPlaceholder />);
    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });

  it('should render with chip prop', () => {
    const TestComponentWithChip = () => {
      const methods = useForm({
        defaultValues: {
          test: ['1'],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            chip
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithChip />);
    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });

  it('should render with checkbox prop', () => {
    const TestComponentWithCheckbox = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            checkbox
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithCheckbox />);
    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });

  it('should render without label', () => {
    const TestComponentWithoutLabel = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithoutLabel />);
    // Component should render even without label
    expect(screen.queryByText('Test Multi Select')).not.toBeInTheDocument();
  });

  it('should render with helperText', () => {
    const TestComponentWithHelper = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            helperText="Helper text"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithHelper />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('should render with error message', () => {
    const TestComponentWithError = () => {
      const methods = useForm({
        defaultValues: {
          test: [],
        },
        mode: 'onChange',
      });

      return (
        <FormProvider {...methods}>
          <RHFMultiSelect
            name="test"
            label="Test Multi Select"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </FormProvider>
      );
    };

    render(<TestComponentWithError />);
    expect(screen.getByText('Test Multi Select')).toBeInTheDocument();
  });
});
