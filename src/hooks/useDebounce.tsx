import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

// export type UseDebounceReturn = string;

// export function useDebounce(value: string, delay = 500): UseDebounceReturn {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   const debounceHandler = useCallback(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   useEffect(() => {
//     debounceHandler();
//   }, [debounceHandler]);

//   const memoizedValue = useMemo(() => debouncedValue, [debouncedValue]);

//   return memoizedValue;
// }

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
