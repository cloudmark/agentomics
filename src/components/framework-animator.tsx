
'use client';

import { useState, useEffect } from 'react';

const frameworks = ['PyTorch', 'TensorFlow', 'JAX', 'Keras'];

export function FrameworkAnimator() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(frameworks[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % frameworks.length;
        setDisplayed(frameworks[nextIndex]);
        return nextIndex;
      });
    }, 2000); // Change framework every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block h-10 w-48">
      {frameworks.map((framework, i) => (
        <span
          key={framework}
          className="absolute left-0 w-full transform transition-all duration-500 ease-in-out"
          style={{
            transform: `translateY(${index === i ? '0' : '-100%'})`,
            opacity: index === i ? 1 : 0,
            transitionDelay: index === i ? '0.2s' : '0s',
          }}
        >
          {framework}
        </span>
      ))}
    </div>
  );
}
