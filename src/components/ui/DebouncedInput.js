import { useState, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from '@/assets/icons/SearchIcon';
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue || '');
  const debouncedCallback = useDebouncedCallback((value) => onChange(value), debounce);

  useMemo(() => setValue(initialValue), [initialValue]);

  return (
    <div className="pt-2 relative mr-auto text-gray-600">
      <button type="submit" className="absolute left-0 top-0 mt-5 ml-4">
        <SearchIcon />
      </button>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 rounded-lg  text-sm focus:outline-none"
        type="search"
        name="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedCallback(e.target.value);
        }}
        placeholder="Search"
        {...props}
      />
    </div>
  );
};
