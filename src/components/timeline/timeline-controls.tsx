'use client';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, Rewind, FastForward, Wand2, GitBranch, ZoomIn, ZoomOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TimelineControlsProps {
    totalDuration: number;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds - Math.floor(seconds)) * 10);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
}

const TimelineControls: FC<TimelineControlsProps> = ({ totalDuration }) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-border bg-card">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Rewind"><Rewind className="w-5 h-5" /></Button>
          </TooltipTrigger>
          <TooltipContent><p>Go to Start</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Play"><Play className="w-5 h-5 fill-current" /></Button>
          </TooltipTrigger>
          <TooltipContent><p>Play/Pause</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Fast Forward"><FastForward className="w-5 h-5" /></Button>
          </TooltipTrigger>
          <TooltipContent><p>Go to End</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="h-6 mx-2" />
      
       <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Create new version">
              <GitBranch className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Create New Branch (Version)</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Regenerate Frame">
              <Wand2 className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Regenerate Current Frame</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator orientation="vertical" className="h-6 mx-2" />
       <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Zoom In"><ZoomIn className="w-5 h-5" /></Button>
          </TooltipTrigger>
          <TooltipContent><p>Zoom In</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Zoom Out"><ZoomOut className="w-5 h-5" /></Button>
          </TooltipTrigger>
          <TooltipContent><p>Zoom Out</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex-1" />
      <span className="text-xs font-mono text-muted-foreground">00:00.0 / {formatTime(totalDuration)}</span>
    </div>
  );
};

export default TimelineControls;
