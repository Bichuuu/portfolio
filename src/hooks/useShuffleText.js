import { useEffect, useState } from "react";

export function useShuffleText(text, speed = 16, duration = 1000) {
  const [shuffledText, setShuffledText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / speed);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const chars = text.split("");

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const output = chars.map((char, i) => {
        if (progress > i / chars.length) {
          return char;
        }
        return letters[Math.floor(Math.random() * letters.length)];
      });

      setShuffledText(output.join(""));

      if (progress >= 1) {
        clearInterval(interval);
        setShuffledText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, duration]);

  return shuffledText;
}
