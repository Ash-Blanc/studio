'use client';
import type { FC, ReactNode } from 'react';
import Clip, { type ClipProps } from './clip';

interface TrackProps {
  title: string;
  icon: ReactNode;
  clips: ClipProps[];
  totalDuration: number;
}

const Track: FC<TrackProps> = ({ title, icon, clips, totalDuration }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Track Header */}
      <div className="w-[160px] shrink-0 h-14 bg-card rounded-md flex items-center px-3 py-2 border border-border shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          {icon}
          <span className="font-medium text-sm truncate" title={title}>{title}</span>
        </div>
      </div>
      
      {/* Track Content */}
      <div className="relative flex-1 h-14 bg-muted/60 rounded-md overflow-hidden border border-border/50">
        {/* You can add time markers here later */}
        {clips.map(clip => (
          <Clip key={clip.id} {...clip} totalDuration={totalDuration} />
        ))}
      </div>
    </div>
  );
};

export default Track;
