import { useEffect, useState } from "react";

export const useWindowSize = (): {
  width: number;
  height: number;
} => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
