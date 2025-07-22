'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video } from 'lucide-react';
import type { VideoHistoryItem } from './pro-video-suite';
import { cn } from '@/lib/utils';

interface VideoLibraryProps {
    history: VideoHistoryItem[];
    onSelect: (item: VideoHistoryItem) => void;
}

const VideoLibrary: FC<VideoLibraryProps> = ({ history, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(history.length > 0 ? history[0].id : null);

  const handleSelect = (item: VideoHistoryItem) => {
    setSelectedId(item.id);
    onSelect(item);
  }

  return (
    <div className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Generation History</CardTitle>
        <CardDescription>Select a previously generated version.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-4">
                <Video className="w-12 h-12 mb-4" />
                <p className="text-sm">Your generated videos will appear here as versions.</p>
            </div>
        ) : (
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 p-2">
                    {history.map((item, index) => (
                        <div 
                            key={item.id} 
                            className="flex flex-col items-center gap-2 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            <div className={cn(
                                "relative w-28 h-20 rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-primary/50",
                                selectedId === item.id && "border-primary ring-2 ring-primary/50"
                            )}>
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover"
                                    muted
                                    disablePictureInPicture
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span className="absolute bottom-1 left-2 text-white text-xs font-bold">V{index + 1}</span>
                            </div>
                            <p className="text-xs text-muted-foreground w-28 truncate text-center" title={item.prompt}>
                                {item.prompt}
                            </p>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        )}
      </CardContent>
    </div>
  );
};

export default VideoLibrary;
