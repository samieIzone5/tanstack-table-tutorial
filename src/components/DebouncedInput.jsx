import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// eslint-disable-next-line react/prop-types
const DebouncedInput = ({ initialValue, placeholder, onChange, className }) => {
  const [value, setValue] = useState(initialValue);
  console.log({ value });
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div>
      <input
        className={className}
        placeholder={placeholder}
        value={initialValue}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DebouncedInput;
