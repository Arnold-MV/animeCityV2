"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface PlyrPlayerProps {
  videoKey: string;
}

export const PlyrPlayer = ({ videoKey }: PlyrPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.innerHTML = `
        <div class="plyr__video-embed" id="player">
          <iframe
            src="https://www.youtube.com/embed/${videoKey}?autoplay=1&origin=localhost"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          ></iframe>
        </div>
      `;
      new Plyr("#player", { youtube: { noCookie: true } });
    }
  }, [videoKey]);

  return <div ref={playerRef} className="w-full h-full" />;
};
