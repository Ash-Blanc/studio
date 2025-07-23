'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Sparkles, Film } from 'lucide-react';

interface VideoPreviewProps {
  src: string | null | undefined;
  isLoading: boolean;
}

const VideoPreview: FC<VideoPreviewProps> = ({ src, isLoading }) => {
  return (
    <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center relative">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-foreground bg-background">
           <div className="relative text-center">
              <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <Film className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
              <p className="relative text-lg font-light tracking-widest">Generating Your Vision...</p>
              <p className="relative text-sm text-muted-foreground">This can take a minute or two.</p>
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
