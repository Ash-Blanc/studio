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
      <div className="w-[142px] shrink-0 h-16 bg-card rounded-md flex items-center px-3 py-2 border border-border shadow-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          {icon}
          <span className="font-medium text-sm truncate" title={title}>{title}</span>
        </div>
      </div>
      
      {/* Track Content */}
      <div className="relative flex-1 h-16 bg-muted/60 rounded-md overflow-hidden">
        {clips.map(clip => (
          <Clip key={clip.id} {...clip} totalDuration={totalDuration} />
        ))}
      </div>
    </div>
  );
};

export default Track;
