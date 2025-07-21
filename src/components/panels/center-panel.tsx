import type { FC } from 'react';
import VideoPreview from '@/components/video-preview';
import IterationTimeline from '@/components/timeline/iteration-timeline';
import TimelineControls from '@/components/timeline/timeline-controls';

interface CenterPanelProps {
  videoInfo: { src: string, duration: number } | null;
  isLoading: boolean;
}

const CenterPanel: FC<CenterPanelProps> = ({ videoInfo, isLoading }) => {
  return (
    <section className="flex-1 flex flex-col bg-background overflow-hidden">
      <div className="flex-1 p-4 flex items-center justify-center bg-black/50">
        <VideoPreview src={videoInfo?.src} isLoading={isLoading} />
      </div>
      <div className="h-[250px] flex flex-col border-t-2 border-border">
        <TimelineControls />
        <IterationTimeline />
      </div>
    </section>
  );
};

export default CenterPanel;
