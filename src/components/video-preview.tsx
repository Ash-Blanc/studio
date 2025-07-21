'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface VideoPreviewProps {
  src: string | null | undefined;
  isLoading: boolean;
}

const VideoPreview: FC<VideoPreviewProps> = ({ src, isLoading }) => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center relative">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-white bg-black">
           <div className="relative">
              <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full animate-pulse" />
              <p className="relative text-lg font-light tracking-widest">Loading...</p>
           </div>
        </div>
      ) : src ? (
        <video key={src} controls autoPlay loop className="w-full h-full object-contain">
          <source src={src} type="video/mp4" />
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
            data-ai-hint="abstract gold"
          />
          <div className="absolute flex flex-col items-center justify-center text-center p-8">
             <SparklesIcon className="w-16 h-16 mb-4" />
            <p className="font-headline text-2xl">Your AI Video Co-Pilot</p>
            <p className="text-sm max-w-md">Create professional videos for your essays, products, or content. Just describe your vision to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
};

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
     </svg>
    )
  }

export default VideoPreview;
