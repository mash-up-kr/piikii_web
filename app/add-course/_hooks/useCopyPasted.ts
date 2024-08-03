import { useEffect, useState } from "react";

const useCopyPasted = () => {
  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.addEventListener("focus", handleFocus);
      } else {
        window.removeEventListener("focus", handleFocus);
      }
    };

    const handleFocus = async () => {
      try {
        const _clipboardText = await navigator.clipboard.readText();
        setClipboardText(_clipboardText);
      } catch (err) {
        throw Error(`Failed to read clipboard contents: ${err}`);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return {
    clipboardText,
    setClipboardText,
  };
};

export default useCopyPasted;
