import { useState } from 'react';

export default function useCountdown(initialSeconds = 120) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const pause = () => {
    if (intervalId) clearInterval(intervalId);
    setIsRunning(false);
  };

  const reset = () => {
    if (intervalId) clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / initialSeconds;

  return { timeLeft, minutes, seconds, isRunning, progress, start, pause, reset };
}
