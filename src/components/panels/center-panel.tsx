import type { FC } from 'react';
import VideoPreview from '@/components/video-preview';

interface CenterPanelProps {
  videoInfo: { src: string, duration: number } | null;
  isLoading: boolean;
}

const CenterPanel: FC<CenterPanelProps> = ({ videoInfo, isLoading }) => {
  return (
    <section className="flex-1 flex flex-col bg-background overflow-hidden p-4 items-center justify-center">
        <VideoPreview src={videoInfo?.src} isLoading={isLoading} />
    </section>
  );
};

export default CenterPanel;
