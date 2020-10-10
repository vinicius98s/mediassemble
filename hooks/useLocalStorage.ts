import { useState } from "react";

type Keys = "user";
type ReturnValue<T> = [T, (value: T) => void];

function useLocalStorage<T>(keyValue: Keys, initialValue: T): ReturnValue<T> {
  const keyPrefix = "@mediassemble";
  const key = `${keyPrefix}/${keyValue}`;

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((newValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (window) {
        window.localStorage.setItem(
          key,
          typeof valueToStore === "string"
            ? valueToStore
            : JSON.stringify(valueToStore)
        );
      } else {
        throw new Error("Invalid setValue call");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
