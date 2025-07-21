import type { FC } from 'react';
import VideoPreview from '@/components/video-preview';
import Timeline from '@/components/timeline/timeline';
import TimelineControls from '@/components/timeline/timeline-controls';

interface CenterPanelProps {
  videoInfo: { src: string, duration: number } | null;
  sceneTimestamps: number[];
}

const CenterPanel: FC<CenterPanelProps> = ({ videoInfo, sceneTimestamps }) => {
  return (
    <section className="flex-1 flex flex-col bg-background overflow-hidden">
      <div className="flex-1 p-4 flex items-center justify-center bg-black/50">
        <VideoPreview src={videoInfo?.src} />
      </div>
      <div className="h-[300px] flex flex-col border-t-2 border-border">
        <TimelineControls />
        <Timeline sceneTimestamps={sceneTimestamps} duration={videoInfo?.duration || 60} />
      </div>
    </section>
  );
};

export default CenterPanel;
