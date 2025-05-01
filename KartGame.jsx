import React, { useEffect, useRef, useState } from 'react';

const KartGame = () => {
  const [position, setPosition] = useState(50);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setPosition((p) => Math.max(p - 10, 0));
      if (e.key === 'ArrowRight') setPosition((p) => Math.min(p + 10, 100));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => [
        ...prev.filter((o) => o.top < 100),
        { id: Date.now(), left: Math.random() * 90, top: 0 },
      ]);
      setScore((s) => s + 1);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fall = setInterval(() => {
      setObstacles((prev) =>
        prev.map((o) => ({ ...o, top: o.top + 5 }))
      );
    }, 100);
    return () => clearInterval(fall);
  }, []);

  useEffect(() => {
    for (const o of obstacles) {
      if (Math.abs(o.top - 90) < 10 && Math.abs(o.left - position) < 10) {
        alert(`Game Over! Final Score: ${score}`);
        setObstacles([]);
        setScore(0);
        break;
      }
    }
  }, [obstacles]);

  return (
    <div ref={gameRef} className="relative w-full max-w-md h-96 bg-white border-2 border-primary rounded-xl overflow-hidden mt-6">
      <div
        className="absolute bottom-2 w-8 h-8 bg-primary rounded-full"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />
      {obstacles.map((o) => (
        <div
          key={o.id}
          className="absolute w-6 h-6 bg-black rounded"
          style={{ top: `${o.top}%`, left: `${o.left}%` }}
        />
      ))}
      <div className="absolute top-2 left-2 text-sm font-semibold">Score: {score}</div>
    </div>
  );
};

export default KartGame;