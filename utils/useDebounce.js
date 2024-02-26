import { useState, useEffect } from "react";

// this function helps to make an API call only after user waits, depending on the delay value
// therefore, if a user is typing in the search field, it will wait until the user finishes before making the API call
// this results in fewer unnessesary API calls to the Weather API
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // when the value and delay fields are modified, it will set the debounced value state only after a specified delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
