import { useState, useEffect } from "react";

const Loader = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showSkeleton) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <span className="loading loading-spinner text-neutral dark:text-warning"></span>
    </div>
  );
};

export default Loader;
