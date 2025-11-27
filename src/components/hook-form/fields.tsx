import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFCheckbox, RHFMultiCheckbox } from './rhf-checkbox';
import { RHFDatePicker, RHFDateTimePicker, RHFTimePicker } from './rhf-date-picker';
import { RHFEditor } from './rhf-editor';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFTextField } from './rhf-text-field';
import { RHFUpload } from './rhf-upload';
import { RHFUploadAvatar } from './rhf-upload-avatar';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Select: RHFSelect,
  Editor: RHFEditor,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  MultiSelect: RHFMultiSelect,
  UploadAvatar: RHFUploadAvatar,
  Autocomplete: RHFAutocomplete,
  DateTimePicker: RHFDateTimePicker,
  Checkbox: RHFCheckbox,
  MultiCheckbox: RHFMultiCheckbox,
  Upload: RHFUpload,
};
