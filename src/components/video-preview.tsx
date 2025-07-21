'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Loader2, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface VideoPreviewProps {
  src: string | null | undefined;
  isLoading: boolean;
}

const VideoPreview: FC<VideoPreviewProps> = ({ src, isLoading }) => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
           <div className="w-1/2 text-center">
              <Loader2 className="w-12 h-12 mb-4 animate-spin mx-auto text-primary" />
              <p className="font-headline text-lg">Generating Your Vision...</p>
              <p className="text-sm mb-4">This may take a few moments. Great art requires patience.</p>
              <Progress value={33} className="w-full" />
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
            <p className="font-headline text-2xl">Welcome to Aetheria Studio</p>
            <p className="text-sm max-w-md">The future of cinematic AI video generation. Use the panels to describe your scene and start creating.</p>
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
