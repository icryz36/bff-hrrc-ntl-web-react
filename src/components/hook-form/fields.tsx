import { RHFAutocomplete } from './rhf-autocomplete';
import { RHFDatePicker, RHFDateTimePicker, RHFTimePicker } from './rhf-date-picker';
import { RHFEditor } from './rhf-editor';
import { RHFRadioGroup } from './rhf-radio-group';
import { RHFMultiSelect, RHFSelect } from './rhf-select';
import { RHFTextField } from './rhf-text-field';
import { RHFUpload, RHFUploadAvatar, RHFUploadBox } from './rhf-upload';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Select: RHFSelect,
  Editor: RHFEditor,
  Upload: RHFUpload,
  UploadBox: RHFUploadBox,
  RadioGroup: RHFRadioGroup,
  DatePicker: RHFDatePicker,
  TimePicker: RHFTimePicker,
  MultiSelect: RHFMultiSelect,
  UploadAvatar: RHFUploadAvatar,
  Autocomplete: RHFAutocomplete,
  DateTimePicker: RHFDateTimePicker,
};
