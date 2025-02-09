import { useState, useEffect } from 'react';

export const useStoredSearchTerm = (
  key: string,
  defaultValue: string = ''
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
