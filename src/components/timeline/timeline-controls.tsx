import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, Rewind, FastForward, Scissors, Plus } from 'lucide-react';

const TimelineControls: FC = () => {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-border bg-card">
      <Button variant="ghost" size="icon" aria-label="Rewind">
        <Rewind className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Play">
        <Play className="w-5 h-5 fill-current" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Pause" className="hidden">
        <Pause className="w-5 h-5 fill-current" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Fast Forward">
        <FastForward className="w-5 h-5" />
      </Button>
      <Separator orientation="vertical" className="h-6 mx-2" />
      <Button variant="ghost" size="icon" aria-label="Split Clip">
        <Scissors className="w-5 h-5" />
      </Button>
      <div className="flex-1" />
      <Button variant="ghost" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Track
      </Button>
    </div>
  );
};

export default TimelineControls;
