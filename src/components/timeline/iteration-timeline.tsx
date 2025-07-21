'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckCircle, Sparkles, GitBranch } from 'lucide-react';


const iterations = [
  { id: 1, name: 'Iteration 1', hint: 'warrior queen mountain', selected: false, isBranch: false },
  { id: 2, name: 'Iteration 2', hint: 'warrior queen sunset', selected: false, isBranch: false },
  { id: 3, name: 'V2 - Cinematic', hint: 'cinematic mountain sunset', selected: true, isBranch: true },
  { id: 4, name: 'V2.1 - Added Dragon', hint: 'dragon sunset mountain', selected: false, isBranch: false },
  { id: 5, name: 'V3 - More Epic', hint: 'epic fantasy battle', selected: false, isBranch: true },
];

const IterationTimeline: FC = () => {
    const [selectedId, setSelectedId] = useState(3);

  return (
    <ScrollArea className="flex-1 bg-muted/30 h-full">
      <div className="p-4">
        <div className="relative flex items-center h-24">
           {/* Timeline track */}
           <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2" />
           
           <div className="relative flex justify-between w-full">
            {iterations.map((iteration, index) => (
                <div 
                    key={iteration.id} 
                    className="group flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setSelectedId(iteration.id)}
                >
                    <div className={cn(
                        "relative w-20 h-12 rounded-md overflow-hidden border-2 transition-all duration-300",
                        selectedId === iteration.id ? "border-primary scale-110" : "border-transparent hover:border-primary/50",
                        iteration.isBranch && "border-amber-400"
                    )}>
                        <Image
                            src={`https://placehold.co/400x225/22272e/c2b280`}
                            width={80}
                            height={45}
                            alt={iteration.name}
                            data-ai-hint={iteration.hint}
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                         {selectedId === iteration.id && (
                            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-primary-foreground" />
                            </div>
                         )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-center">
                        {iteration.isBranch && <GitBranch className="w-3 h-3 text-amber-400" />}
                        <span className={cn(selectedId === iteration.id ? "text-primary font-semibold" : "text-muted-foreground")}>{iteration.name}</span>
                    </div>
                </div>
            ))}
           </div>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default IterationTimeline;
