"use client";

import { useState, useEffect } from 'react';
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
import { generateVideo } from '@/ai/flows/generate-video-flow';
import { useToast } from '@/hooks/use-toast';

const ProVideoSuite: FC = () => {
  const { toast } = useToast();
  const [videoInfo, setVideoInfo] = useState<{ src: string, duration: number } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500); // Show initial loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);


  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setVideoInfo(null);
    
    toast({
      title: '🚀 Generation Started',
      description: 'Your video is being created. This may take a minute or two...',
    });

    try {
      const result = await generateVideo({ prompt });
      // Create a temporary video element to get the duration
      const videoElement = document.createElement('video');
      videoElement.onloadedmetadata = () => {
        setVideoInfo({ src: result.videoUrl, duration: videoElement.duration });
      };
      videoElement.src = result.videoUrl;

      toast({
        variant: 'default',
        className: "bg-green-600/20 border-green-500",
        title: '✅ Generation Complete!',
        description: 'Your masterpiece is ready.',
      });
    } catch (error) {
      console.error('Video generation failed:', error);
      toast({
        variant: 'destructive',
        title: '❌ Generation Failed',
        description: 'Something went wrong. Please check the console for details and try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
          <p className="relative text-lg font-light tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden border-t border-border">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          <LeftPanel onGenerate={handleGenerate} isLoading={isGenerating} />
          <div className="flex-1 flex flex-col overflow-hidden">
              <div className='flex flex-1 overflow-hidden'>
                  <CenterPanel videoInfo={videoInfo} isLoading={isGenerating} />
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
          <CenterPanel videoInfo={videoInfo} isLoading={isGenerating} />
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
                        <LeftPanel onGenerate={handleGenerate} isLoading={isGenerating} />
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
