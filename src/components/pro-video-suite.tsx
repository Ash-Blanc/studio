"use client";

import { useState } from 'react';
import type { FC } from 'react';
import Header from '@/components/layout/header';
import LeftPanel from '@/components/panels/left-panel';
import CenterPanel from '@/components/panels/center-panel';
import RightPanel from '@/components/panels/right-panel';
import IterationTimeline from '@/components/timeline/iteration-timeline';
import TimelineControls from '@/components/timeline/timeline-controls';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';

const ProVideoSuite: FC = () => {
  const [videoInfo, setVideoInfo] = useState<{ src: string, duration: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setVideoInfo(null); // Clear previous video
    // Simulate generation time
    setTimeout(() => {
      setVideoInfo({ src: '/generated-video.mp4', duration: 10 });
      setIsLoading(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden border-t border-border">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          <LeftPanel onGenerate={handleGenerate} isLoading={isLoading} />
          <div className="flex-1 flex flex-col overflow-hidden">
              <div className='flex flex-1 overflow-hidden'>
                  <CenterPanel videoInfo={videoInfo} isLoading={isLoading} />
                  <RightPanel />
              </div>
              <div className="h-[250px] flex flex-col border-t-2 border-border">
                  <TimelineControls />
                  <IterationTimeline />
              </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
          <CenterPanel videoInfo={videoInfo} isLoading={isLoading} />
          <div className='p-2 border-t border-border'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <PanelLeft className="mr-2" />
                        AI Tools & Timeline
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] flex flex-col p-0">
                    <SheetHeader className="p-4 border-b border-border">
                        <SheetTitle>AI Studio Tools</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <LeftPanel onGenerate={handleGenerate} isLoading={isLoading} />
                        <RightPanel />
                        <div className="border-t-2 border-border">
                            <TimelineControls />
                            <IterationTimeline />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProVideoSuite;
