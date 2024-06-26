import React, { useState, useEffect } from 'react';

interface TimerProps {
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [time, setTime] = useState<number>(60); // 60秒のタイマー

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [time]);

  return <p>{time}</p>;
};

export default Timer;
