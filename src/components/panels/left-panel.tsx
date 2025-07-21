'use client';

import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, LayoutGrid } from 'lucide-react';
import AiSceneDetector from '@/components/ai-scene-detector';
import TemplateLibrary from '@/components/template-library';

interface LeftPanelProps {
  onScenesDetected: (timestamps: number[]) => void;
  onVideoUpload: (src: string, duration: number) => void;
}

const LeftPanel: FC<LeftPanelProps> = ({ onScenesDetected, onVideoUpload }) => {
  return (
    <aside className="w-[300px] bg-card flex flex-col border-r border-border">
      <div className="p-2">
        <Tabs defaultValue="ai-detector">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-detector">
              <Bot className="w-4 h-4 mr-2" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="templates">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai-detector" className="mt-2">
            <AiSceneDetector onScenesDetected={onScenesDetected} onVideoUpload={onVideoUpload} />
          </TabsContent>
          <TabsContent value="templates" className="mt-2">
            <TemplateLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
};

export default LeftPanel;
