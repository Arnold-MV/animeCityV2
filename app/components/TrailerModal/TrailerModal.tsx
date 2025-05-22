"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";

interface TrailerModalProps {
  videoKey: string;
  onClose: () => void;
}

export const TrailerModal = ({ videoKey, onClose }: TrailerModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="relative w-full max-w-2xl aspect-video">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  cursor-pointer border transition-colors border-gray-500 bg-gray-600 hover:bg-gray-700 rounded-full z-10 text-xl"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
              fill="#ffffff"
            />
          </svg>
        </button>
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src: videoKey,
                provider: "youtube",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
