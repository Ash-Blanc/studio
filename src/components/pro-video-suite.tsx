"use client";

import { useState } from 'react';
import type { FC } from 'react';
import Header from '@/components/layout/header';
import LeftPanel from '@/components/panels/left-panel';
import CenterPanel from '@/components/panels/center-panel';
import RightPanel from '@/components/panels/right-panel';

const ProVideoSuite: FC = () => {
  const [sceneTimestamps, setSceneTimestamps] = useState<number[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ src: string, duration: number } | null>(null);

  const handleScenesDetected = (timestamps: number[]) => {
    setSceneTimestamps(timestamps);
  };

  const handleVideoUpload = (src: string, duration: number) => {
    setVideoInfo({ src, duration });
    setSceneTimestamps([]); // Reset timestamps for new video
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden border-t border-border">
        <LeftPanel onScenesDetected={handleScenesDetected} onVideoUpload={handleVideoUpload} />
        <CenterPanel videoInfo={videoInfo} sceneTimestamps={sceneTimestamps} />
        <RightPanel />
      </main>
    </div>
  );
};

export default ProVideoSuite;
