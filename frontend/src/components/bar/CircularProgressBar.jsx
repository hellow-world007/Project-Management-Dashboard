import { useEffect, useState } from "react";

const CircularProgressBar = ({ percentage, color }) => {
  const [progress, setProgress] = useState(0);
  const circleRadius = 15;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const strokeDashoffset =
    circleCircumference - (progress / 100) * circleCircumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(percentage);
    }, 500);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="w-24 h-24">
      <svg
        className="transform rotate-[-90deg]"
        width="72"
        height="72"
        viewBox="0 0 40 40"
      >
        <circle
          cx="20"
          cy="20"
          r={circleRadius}
          stroke="#ffffff"
          strokeWidth="8"
          fill="none"
        />

        <circle
          cx="20"
          cy="20"
          r={circleRadius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="inherit"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
