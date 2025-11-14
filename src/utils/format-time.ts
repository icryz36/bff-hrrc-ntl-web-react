import dayjs from 'dayjs';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'DD/MM/YYYY';
  return date ? dayjs(date).format(fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'DD MMM YYYY h:mm A';
  return date ? dayjs(date).format(fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? dayjs(date).valueOf() : '';
}

export function fToNow(date: InputValue) {
  return date ? dayjs(date).fromNow() : '';
}
