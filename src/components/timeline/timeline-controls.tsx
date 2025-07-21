import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, Rewind, FastForward, Wand2, GitBranch } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const TimelineControls: FC = () => {
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

      <div className="flex-1" />
      <span className="text-xs font-mono text-muted-foreground">00:04.1 / 00:10.0</span>
    </div>
  );
};

export default TimelineControls;
