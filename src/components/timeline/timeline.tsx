import type { FC } from 'react';
import Track from './track';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Film, Music } from 'lucide-react';

interface TimelineProps {
  sceneTimestamps: number[];
  duration: number;
}

const Timeline: FC<TimelineProps> = ({ sceneTimestamps, duration }) => {
  const formatTime = (seconds: number) => new Date(seconds * 1000).toISOString().substr(14, 5);

  const timeMarkers = Array.from({ length: Math.ceil(duration / 5) + 1 }, (_, i) => i * 5);

  return (
    <ScrollArea className="flex-1 bg-muted/30 h-full">
      <div className="relative w-fit min-w-full">
        {/* Time Ruler */}
        <div className="h-8 sticky top-0 bg-card z-20 border-b border-border flex items-end">
          <div className="w-[150px] shrink-0"></div>
          <div className="relative h-full flex-1">
            {timeMarkers.map(time => (
              <div
                key={time}
                className="absolute -bottom-1 h-full flex flex-col items-center"
                style={{ left: `${(time / duration) * 100}%` }}
              >
                <span className="text-xs text-muted-foreground">{formatTime(time)}</span>
                <div className="w-px h-2 bg-muted-foreground/50 mt-1"></div>
              </div>
            ))}
            {/* Scene change markers */}
            {sceneTimestamps.map((timestamp, index) => {
                const left = (timestamp / duration) * 100;
                return (
                  <div
                    key={`scene-${index}`}
                    style={{ left: `${left}%` }}
                    className="absolute top-0 w-0.5 h-full bg-primary/70 z-10"
                    title={`Scene change at ${timestamp.toFixed(2)}s`}
                  >
                    <div className="absolute -top-2 -translate-x-1/2 bg-primary rounded-full w-2 h-2"></div>
                  </div>
                );
            })}
             {/* Playhead */}
            <div className="absolute top-0 w-0.5 h-full bg-primary z-30" style={{left: '10%'}}>
              <div className="absolute -top-2.5 -translate-x-1/2 bg-primary w-4 h-4" style={{clipPath: 'polygon(50% 100%, 0 0, 100% 0)'}}></div>
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="p-2 space-y-2">
            <Track
              title="Video 1"
              icon={<Film className="w-4 h-4 text-secondary-foreground/80" />}
              clips={[
                { id: 'v1', start: 2, duration: 10, name: 'product_shot_01.mp4' },
                { id: 'v2', start: 15, duration: 18, name: 'interview_angle_A.mp4' },
                { id: 'v3', start: 38, duration: 12, name: 'b_roll_factory.mp4' },
              ]}
              totalDuration={duration}
            />
            <Track
              title="Audio 1"
              icon={<Music className="w-4 h-4 text-secondary-foreground/80" />}
              clips={[
                { id: 'a1', start: 0, duration: 60, name: 'upbeat_corporate_track.wav' },
              ]}
              totalDuration={duration}
            />
            <Track
              title="Sound FX"
              icon={<Music className="w-4 h-4 text-secondary-foreground/80" />}
               clips={[
                { id: 'sfx1', start: 10.5, duration: 1, name: 'swoosh.wav' },
                { id: 'sfx2', start: 38.2, duration: 1, name: 'click.wav' },
              ]}
              totalDuration={duration}
            />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Timeline;
