
"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import Header from '@/components/layout/header';
import LeftPanel from '@/components/panels/left-panel';
import CenterPanel from '@/components/panels/center-panel';
import RightPanel from '@/components/panels/right-panel';
import Timeline from '@/components/timeline/timeline';
import TimelineControls from '@/components/timeline/timeline-controls';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PanelLeft, ChevronsUpDown, ChevronsRight, ChevronsLeft, Sparkles } from 'lucide-react';
import { generateVideo } from '@/ai/flows/generate-video-flow';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


export interface VideoHistoryItem {
  id: string;
  src: string;
  duration: number;
  prompt: string;
}

const ProVideoSuite: FC = () => {
  const { toast } = useToast();
  const [videoInfo, setVideoInfo] = useState<{ src: string, duration: number } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [clips, setClips] = useState<any[]>([]);
  const [totalDuration, setTotalDuration] = useState(60);
  const [videoHistory, setVideoHistory] = useState<VideoHistoryItem[]>([]);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);


  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const handleScenesDetected = (timestamps: number[]) => {
    // Process timestamps to create clips
    console.log("Detected scene timestamps:", timestamps);
    // You could create new clips based on these timestamps here
  };

  const handleVideoUpload = (src: string, duration: number) => {
    setVideoInfo({ src, duration });
    setTotalDuration(duration);
    setClips([{
      id: 'main-video',
      start: 0,
      duration: duration,
      name: 'Uploaded Video',
      track: 'video'
    }]);
  };
  
  const handleSelectFromHistory = (item: VideoHistoryItem) => {
    setVideoInfo({ src: item.src, duration: item.duration });
    setTotalDuration(item.duration);
    setClips([{
      id: item.id,
      start: 0,
      duration: item.duration,
      name: item.prompt.substring(0, 30) + '...',
      track: 'video',
    }]);
  }

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setVideoInfo(null);
    setClips([]);
    
    toast({
      title: '🚀 Generation Started',
      description: 'Your video is being created. This may take a minute or two...',
    });

    try {
      const result = await generateVideo({ prompt });
      const videoElement = document.createElement('video');
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        const newHistoryItem: VideoHistoryItem = {
          id: `vid_${Date.now()}`,
          src: result.videoUrl,
          duration,
          prompt
        };

        setVideoInfo({ src: result.videoUrl, duration });
        setTotalDuration(duration);
        setVideoHistory(prev => [newHistoryItem, ...prev]);
        setClips([{
          id: newHistoryItem.id,
          start: 0,
          duration: duration,
          name: prompt.substring(0, 30) + '...',
          track: 'video',
        }]);
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
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: '❌ Generation Failed',
        description: errorMessage,
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center text-white">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
           <div className="relative text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
              <p className="relative text-lg font-light tracking-widest text-white/70">Loading Studio...</p>
           </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden border-t border-border">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          {isLeftPanelCollapsed ? (
             <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setIsLeftPanelCollapsed(false)} className="m-2">
                        <ChevronsRight className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Expand Panel</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          ) : (
            <LeftPanel 
              onGenerate={handleGenerate} 
              isLoading={isGenerating} 
              videoHistory={videoHistory}
              onSelectFromHistory={handleSelectFromHistory}
              onCollapse={() => setIsLeftPanelCollapsed(true)}
            />
          )}
          <div className="flex-1 flex flex-col overflow-hidden">
              <div className='flex flex-1 overflow-hidden'>
                  <CenterPanel videoInfo={videoInfo} isLoading={isGenerating} />
                   {isRightPanelCollapsed ? (
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setIsRightPanelCollapsed(false)} className="m-2">
                                <ChevronsLeft className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Expand Panel</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    ) : (
                    <RightPanel 
                      onCollapse={() => setIsRightPanelCollapsed(true)} 
                      onScenesDetected={handleScenesDetected}
                      onVideoUpload={handleVideoUpload}
                    />
                    )}
              </div>
              <div className="h-[250px] flex flex-col border-t-2 border-border">
                  <TimelineControls totalDuration={totalDuration} />
                  <Timeline clips={clips} totalDuration={totalDuration} />
              </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
          <CenterPanel videoInfo={videoInfo} isLoading={isGenerating} />
           <div className="flex flex-col border-t border-border">
             <div className='p-2'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <PanelLeft className="mr-2" />
                            Open AI Tools & Parameters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] flex flex-col p-0">
                        <SheetHeader className="p-4 border-b border-border">
                            <SheetTitle>AI Studio Tools</SheetTitle>
                        </SheetHeader>
                        <div className="flex-1 overflow-y-auto">
                            <LeftPanel 
                                onGenerate={handleGenerate} 
                                isLoading={isGenerating} 
                                videoHistory={videoHistory}
                                onSelectFromHistory={handleSelectFromHistory}
                                onCollapse={() => {}} // Collapse not needed for mobile sheet view
                            />
                            <RightPanel 
                              onCollapse={() => {}} 
                              onScenesDetected={handleScenesDetected}
                              onVideoUpload={handleVideoUpload}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
             </div>
              <Collapsible>
                  <CollapsibleTrigger className="w-full">
                      <div className='flex items-center justify-center p-2 border-t border-border bg-card text-muted-foreground'>
                         <ChevronsUpDown className="w-4 h-4 mr-2" /> Show Timeline
                      </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="h-[250px] flex flex-col border-t-2 border-border">
                        <TimelineControls totalDuration={totalDuration} />
                        <Timeline clips={clips} totalDuration={totalDuration} />
                    </div>
                  </CollapsibleContent>
              </Collapsible>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProVideoSuite;
