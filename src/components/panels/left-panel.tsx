'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, MessageSquare, Plus, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '../ui/scroll-area';

interface LeftPanelProps {
  onGenerate: () => void;
  isLoading: boolean;
}

const LeftPanel: FC<LeftPanelProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <aside className="w-[400px] bg-card flex flex-col border-r border-border p-4 gap-4">
       <div className="flex items-center gap-2">
         <Bot className="w-6 h-6 text-primary" />
         <h2 className="text-lg font-headline font-bold">AI Assistant</h2>
       </div>

       <ScrollArea className="flex-1 -mx-4">
         <div className="px-4 py-2 space-y-6">
            {/* Initial Message */}
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                    <Bot className="w-5 h-5 text-primary"/>
                </div>
                <div className="p-3 rounded-lg bg-muted max-w-[80%]">
                    <p className="text-sm">Welcome to Aetheria Studio! How can I help you create today? You can describe a scene, upload an image, or even provide a video to transform.</p>
                </div>
            </div>
             {/* User Message Example */}
             <div className="flex items-start gap-3 justify-end">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-[80%]">
                    <p className="text-sm">An epic cinematic shot of a warrior queen on a mountain peak, golden hour lighting, 8K, hyperrealistic...</p>
                </div>
            </div>
         </div>
       </ScrollArea>
       
       <div className="mt-auto space-y-2">
         <div className="relative flex items-center">
            <Textarea
                placeholder="Ask Aetheria..."
                className="w-full resize-none pr-28 pl-10 py-3"
                value={prompt}
                rows={1}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onGenerate();
                  }
                }}
            />
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="ghost" size="icon" className="absolute left-1.5 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Plus className="w-4 h-4" />
                         </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top"><p>Add Media</p></TooltipContent>
                </Tooltip>
             </TooltipProvider>

            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MessageSquare className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>Chat Mode</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={onGenerate}
                    disabled={isLoading || !prompt}
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
         </div>
       </div>
    </aside>
  );
};

export default LeftPanel;
