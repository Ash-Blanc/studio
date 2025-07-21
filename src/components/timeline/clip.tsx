import type { FC } from 'react';

export interface ClipProps {
  id: string;
  start: number;
  duration: number;
  name: string;
  totalDuration?: number;
}

const Clip: FC<ClipProps> = ({ start, duration, name, totalDuration = 60 }) => {
  const left = (start / totalDuration) * 100;
  const width = (duration / totalDuration) * 100;

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 h-12 bg-secondary rounded-md flex items-center px-3 text-secondary-foreground shadow-inner-md border border-secondary-foreground/20 cursor-grab active:cursor-grabbing"
      style={{
        left: `${left}%`,
        width: `${width}%`,
      }}
      title={name}
    >
      <span className="text-xs font-medium truncate pointer-events-none">{name}</span>
    </div>
  );
};

export default Clip;
