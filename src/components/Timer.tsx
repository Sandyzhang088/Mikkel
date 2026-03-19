import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TimerProps {
  totalSeconds: number;
  onTimeUp?: () => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeUp, className }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft < 60;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-sm transition-colors",
      isLowTime ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-50 text-blue-600",
      className
    )}>
      <Clock size={16} />
      <span>剩余 {minutes}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};
