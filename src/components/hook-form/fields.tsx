import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFDatePicker, RHFDateTimePicker, RHFTimePicker } from './rhf-date-picker';
import { RHFEditor } from './rhf-editor';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFTextField } from './rhf-text-field';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Select: RHFSelect,
  Editor: RHFEditor,
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  MultiSelect: RHFMultiSelect,
  Autocomplete: RHFAutocomplete,
  DateTimePicker: RHFDateTimePicker,
};
