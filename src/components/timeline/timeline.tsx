'use client';

import type { FC, ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video, ImageIcon, Mic, CaseSensitive } from 'lucide-react';
import Track from './track';
import type { ClipProps } from './clip';

interface TimelineProps {
  clips: (ClipProps & { track: string })[];
  totalDuration: number;
}

const trackConfig: { [key: string]: { title: string; icon: ReactNode } } = {
  video: { title: 'Main Video', icon: <Video className="w-5 h-5 text-pink-500" /> },
  broll: { title: 'B-Roll / Images', icon: <ImageIcon className="w-5 h-5 text-green-500" /> },
  audio: { title: 'Voiceover & Music', icon: <Mic className="w-5 h-5 text-blue-500" /> },
  text: { title: 'Titles & Captions', icon: <CaseSensitive className="w-5 h-5 text-purple-500" /> },
};

const Timeline: FC<TimelineProps> = ({ clips, totalDuration }) => {
  const tracks = Object.keys(trackConfig).map(trackKey => {
    const trackClips = clips.filter(clip => clip.track === trackKey);
    return (
      <Track
        key={trackKey}
        title={trackConfig[trackKey].title}
        icon={trackConfig[trackKey].icon}
        clips={trackClips}
        totalDuration={totalDuration}
      />
    );
  });

  return (
    <ScrollArea className="flex-1 bg-muted/30 h-full">
      <div className="p-4 space-y-2">
        {tracks}
      </div>
    </ScrollArea>
  );
};

export default Timeline;
