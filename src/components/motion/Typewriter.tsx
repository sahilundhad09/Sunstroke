"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  speed?: number; // ms per char
  pause?: number; // ms between words
}

export function Typewriter({
  words,
  className = "",
  speed = 80,
  pause = 2200,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
          timerRef.current = setTimeout(tick, speed);
        } else {
          timerRef.current = setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
          timerRef.current = setTimeout(tick, speed / 2);
        } else {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-sunstroke-cyan">|</span>
    </span>
  );
}
