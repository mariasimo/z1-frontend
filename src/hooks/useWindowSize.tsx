// hook to get window size without conflicting gatsby build
// from : https://dev.to/reedbarger/how-to-create-a-usewindowsize-react-hook-2bcm

import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
