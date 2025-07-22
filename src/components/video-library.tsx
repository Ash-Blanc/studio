'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video } from 'lucide-react';
import type { VideoHistoryItem } from './pro-video-suite';

interface VideoLibraryProps {
    history: VideoHistoryItem[];
    onSelect: (item: VideoHistoryItem) => void;
}

const VideoLibrary: FC<VideoLibraryProps> = ({ history, onSelect }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Generation Library</CardTitle>
        <CardDescription>Review your previously generated videos.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
            {history.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center">
                    <Video className="w-12 h-12 mb-4" />
                    <p className="text-sm">Your generated videos will appear here.</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 pr-4">
                    {history.map(item => (
                    <div key={item.id} className="group relative rounded-lg overflow-hidden cursor-pointer" onClick={() => onSelect(item)}>
                        <video
                            src={item.src}
                            className="w-full h-auto object-cover bg-muted transition-transform duration-300 group-hover:scale-105"
                            muted
                            disablePictureInPicture
                            playsInline
                         />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                            <div className="p-3 text-white">
                                <p className="text-xs font-medium truncate" title={item.prompt}>
                                    {item.prompt}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VideoLibrary;
