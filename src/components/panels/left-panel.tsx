'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Bot, FileText, Grid, Plus, ArrowUp, Library, ChevronsLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiSceneDetector from '../ai-scene-detector';
import TemplateLibrary from '../template-library';
import VideoLibrary from '../video-library';
import type { VideoHistoryItem } from '../pro-video-suite';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface LeftPanelProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  onScenesDetected: (timestamps: number[]) => void;
  onVideoUpload: (src: string, duration: number) => void;
  videoHistory: VideoHistoryItem[];
  onSelectFromHistory: (item: VideoHistoryItem) => void;
  onCollapse: () => void;
}

const GenerationPanel: FC<Pick<LeftPanelProps, 'onGenerate' | 'isLoading'>> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
       <div className="flex-1" />
       
       <div className="mt-auto">
         <div className="relative">
            <Textarea
                placeholder="Describe your video scene, or enter a script..."
                className="w-full resize-none pr-12 pl-10 py-3 min-h-[52px] rounded-2xl"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
            />
            <Button variant="ghost" size="icon" className="absolute left-1.5 top-1/2 -translate-y-1/2 h-8 w-8">
                <Plus className="w-5 h-5" />
            </Button>
            <Button 
                size="icon" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
            >
                <ArrowUp className="w-5 h-5" />
            </Button>
         </div>
       </div>
    </div>
  );
};


const LeftPanel: FC<LeftPanelProps> = ({ onGenerate, isLoading, onScenesDetected, onVideoUpload, videoHistory, onSelectFromHistory, onCollapse }) => {
  return (
    <aside className="w-full lg:w-[400px] bg-card flex flex-col lg:border-r lg:border-border relative transition-all duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={onCollapse}>
              <ChevronsLeft className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Collapse Panel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Tabs defaultValue="prompt" className="flex-1 flex flex-col">
        <div className="p-2 border-b border-border">
            <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prompt">
                <FileText className="w-4 h-4 mr-2" />
                Script
            </TabsTrigger>
             <TabsTrigger value="library">
                <Library className="w-4 h-4 mr-2" />
                Library
            </TabsTrigger>
            <TabsTrigger value="templates">
                <Grid className="w-4 h-4 mr-2" />
                Templates
            </TabsTrigger>
            <TabsTrigger value="tools">
                <Bot className="w-4 h-4 mr-2" />
                Tools
            </TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="prompt" className="flex-1">
          <GenerationPanel onGenerate={onGenerate} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="library">
            <VideoLibrary history={videoHistory} onSelect={onSelectFromHistory} />
        </TabsContent>
        <TabsContent value="templates">
            <TemplateLibrary />
        </TabsContent>
        <TabsContent value="tools">
            <AiSceneDetector onScenesDetected={onScenesDetected} onVideoUpload={onVideoUpload}/>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default LeftPanel;
