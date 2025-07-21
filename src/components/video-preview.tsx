'use client';

import type { FC } from 'react';
import Image from 'next/image';

interface VideoPreviewProps {
  src: string | null | undefined;
}

const VideoPreview: FC<VideoPreviewProps> = ({ src }) => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-border">
      {src ? (
        <video key={src} controls className="w-full h-full object-contain">
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
          <Image
            src="https://placehold.co/1280x720/22272e/444951?text=+"
            width={1280}
            height={720}
            alt="Video placeholder"
            className="w-full h-full object-cover opacity-20"
            data-ai-hint="abstract geometric"
          />
          <div className="absolute flex flex-col items-center justify-center">
             <FilmIcon className="w-16 h-16 mb-4" />
            <p className="font-headline">ProLaunch Video Suite</p>
            <p className="text-sm">Upload a video to begin</p>
          </div>
        </div>
      )}
    </div>
  );
};

function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M21 7.5h-4" />
        <path d="M21 16.5h-4" />
      </svg>
    )
  }

export default VideoPreview;
