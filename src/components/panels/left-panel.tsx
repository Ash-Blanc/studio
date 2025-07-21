'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Plus, ArrowUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface LeftPanelProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const LeftPanel: FC<LeftPanelProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <aside className="w-full lg:w-[400px] bg-card flex flex-col lg:border-r lg:border-border p-4">
       <div className="flex-1" />
       
       <div className="mt-auto">
         <div className="relative">
            <Textarea
                placeholder="Ask..."
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
    </aside>
  );
};

export default LeftPanel;
