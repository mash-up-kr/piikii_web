import { useCallback, useEffect, useState } from "react";
import { KEYPAD_DATA } from "../_constants";
import { cloneDeep } from "lodash-es";

type KeypadIdType = (typeof KEYPAD_DATA)[number]["id"];

export interface UsePasswordKeypadProps {
  onPasswordComplete: (password: string[]) => void;
}

const usePasswordKeypad = ({ onPasswordComplete }: UsePasswordKeypadProps) => {
  const [password, setPassword] = useState<string[]>([]);

  const handlePassword = useCallback(
    (keypadId: KeypadIdType) => {
      const data = cloneDeep(password);

      if (keypadId === "empty") return;

      if (keypadId !== "back") {
        if (data.length === 4) return;
        data.push(keypadId);
      }

      if (keypadId === "back") {
        if (data.length === 0) return;
        if (data.length > 0) data.pop();
      }

      setPassword(data);
    },
    [password]
  );

  const initPassword = () => {
    setPassword([]);
  };

  useEffect(() => {
    if (password.length === 4) {
      onPasswordComplete(password);
      initPassword();
    }
  }, [onPasswordComplete, password]);

  return {
    password,
    KEYPAD_DATA,
    handlePassword,
  };
};

export default usePasswordKeypad;
