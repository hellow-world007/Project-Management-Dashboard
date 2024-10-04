import { useEffect, useState } from "react";

export const useCounter = (endValue, duration = 500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 100);

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        start = endValue;
        clearInterval(counterInterval);
      }
      setCount(Math.round(start));
    }, 100);

    return () => clearInterval(counterInterval);
  }, [endValue, duration]);

  return count;
};
