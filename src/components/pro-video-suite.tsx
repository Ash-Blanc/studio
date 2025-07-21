"use client";

import { useState } from 'react';
import type { FC } from 'react';
import Header from '@/components/layout/header';
import LeftPanel from '@/components/panels/left-panel';
import CenterPanel from '@/components/panels/center-panel';
import RightPanel from '@/components/panels/right-panel';

const ProVideoSuite: FC = () => {
  const [videoInfo, setVideoInfo] = useState<{ src: string, duration: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setVideoInfo(null); // Clear previous video
    // Simulate generation time
    setTimeout(() => {
      setVideoInfo({ src: '/generated-video.mp4', duration: 10 });
      setIsLoading(false);
    }, 4000);
  };


  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden border-t border-border">
        <LeftPanel onGenerate={handleGenerate} isLoading={isLoading} />
        <CenterPanel videoInfo={videoInfo} isLoading={isLoading} />
        <RightPanel />
      </main>
    </div>
  );
};

export default ProVideoSuite;
