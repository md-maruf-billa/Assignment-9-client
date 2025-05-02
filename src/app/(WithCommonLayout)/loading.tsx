'use client';

import React from 'react';

const Loading: React.FC = () => {
  const items = Array.from({ length: 9 });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-3 grid-rows-3 w-[87.2px] h-[87.2px] gap-[1px]">
        {items.map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#2563eb',
              animation: `flipping 1.5s ${index * 0.1}s infinite backwards`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes flipping {
          0% {
            transform: perspective(67.2px) rotateX(-90deg);
          }
          50%,
          75% {
            transform: perspective(67.2px) rotateX(0);
          }
          100% {
            opacity: 0;
            transform: perspective(67.2px) rotateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
