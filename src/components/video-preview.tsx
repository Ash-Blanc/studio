'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface VideoPreviewProps {
  src: string | null | undefined;
  isLoading: boolean;
}

const LoadingAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <svg viewBox="0 0 200 200" className="w-48 h-48">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Main Orb */}
            <circle cx="100" cy="100" r="30" fill="hsl(var(--primary))" filter="url(#glow)">
                <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Orbiting particles */}
            {[...Array(5)].map((_, i) => (
                <g key={i} transform="rotate(0 100 100)">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 100 100`}
                        to={`${360} 100 100`}
                        dur={`${5 + i * 2}s`}
                        repeatCount="indefinite"
                    />
                    <circle
                        cx="100"
                        cy={`${30 + i * 15}`}
                        r={`${2 + (i % 2)}`}
                        fill="hsl(var(--primary-foreground))"
                        opacity="0.7"
                    >
                         <animate
                            attributeName="opacity"
                            values="0.5;1;0.5"
                            dur={`${2 + i}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            ))}
        </svg>
    </div>
);


const VideoPreview: FC<VideoPreviewProps> = ({ src, isLoading }) => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center relative">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-foreground bg-background">
           <div className="relative text-center w-full h-full">
              <LoadingAnimation />
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full px-4">
                <p className="relative text-lg font-light tracking-widest">Generating Your Vision...</p>
                <p className="relative text-sm text-muted-foreground">This can take a minute or two.</p>
              </div>
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
            src="https://placehold.co/1280x720/22272e/c2b280"
            width={1280}
            height={720}
            alt="Video placeholder"
            className="w-full h-full object-cover opacity-10"
            data-ai-hint="abstract gold"
          />
          <div className="absolute flex flex-col items-center justify-center text-center p-8 text-foreground">
             <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
             </div>
            <p className="font-headline text-2xl">Your AI Video Co-Pilot</p>
            <p className="text-sm max-w-md text-muted-foreground">Create professional videos for your essays, products, or content. Just describe your vision to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
