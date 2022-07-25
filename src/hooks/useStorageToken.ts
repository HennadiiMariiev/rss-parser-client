import { useState } from "react";

function useStorageToken(key: "accessToken" | "refreshToken", initialValue: string) {
    const [storedValue, setStoredValue] = useState<string>(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? item : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
    const setValue = (value: string | ((val: string) => string)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, valueToStore);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue] as const;
  }

  export default useStorageToken;