import { useRef, useState, useEffect } from "react";

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = true;
    audio.volume = 0.5; // adjust to taste
    audioRef.current = audio;

    audio.play().catch(() => {
      // Autoplay may still be blocked on some browsers until user interacts
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);

    // Some browsers need play() called again after first user gesture
    if (!next) {
      audioRef.current.play().catch(() => {});
    }
  };

  return { isMuted, toggleMute };
}