import { useEffect, useState } from "react";

const useCountDown = (number: number) => {
  const [count, setCount] = useState<number>(number);
  useEffect(() => {
    if (count !== 0) {
      const time = 1000;
      const timer = setTimeout(() => setCount(count - 1), time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [count]);

  return [count, count === 0] as const;
};

export default useCountDown;
