import { useEffect, useState } from "react";

export default function StatusCount({ value, className }: { value: number; className: string }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className={`${className} ${animate ? "change" : ""}`}>
      {value}
    </div>
  );
}

