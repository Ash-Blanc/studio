'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { detectSceneChanges } from '@/ai/flows/detect-scene-changes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Bot, Loader2 } from 'lucide-react';

interface AiSceneDetectorProps {
  onScenesDetected: (timestamps: number[]) => void;
  onVideoUpload: (src: string, duration: number) => void;
}

const AiSceneDetector: FC<AiSceneDetectorProps> = ({ onScenesDetected, onVideoUpload }) => {
  const { toast } = useToast();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useState<HTMLVideoElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
            toast({
                variant: 'destructive',
                title: 'File too large',
                description: 'Please select a video file smaller than 4MB for AI processing.',
            });
            return;
        }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = event.currentTarget;
    onVideoUpload(video.src, video.duration);
  };
  
  const handleDetect = async () => {
    if (!videoFile) {
      toast({
        variant: 'destructive',
        title: 'No video selected',
        description: 'Please upload a video file first.',
      });
      return;
    }
    
    setIsLoading(true);
    toast({ title: 'AI processing started...', description: 'Please wait while we detect scenes.' });

    try {
        const reader = new FileReader();
        reader.readAsDataURL(videoFile);
        reader.onload = async (e) => {
            const dataUri = e.target?.result as string;
            const result = await detectSceneChanges({ videoDataUri: dataUri });
            onScenesDetected(result.sceneTimestamps);
            toast({
                variant: 'default',
                className: "bg-green-600/20 border-green-500",
                title: 'Success!',
                description: `Detected ${result.sceneTimestamps.length} scene changes. Check the timeline!`,
            });
        };
        reader.onerror = (error) => {
             throw new Error("Failed to read file.");
        }
    } catch (error) {
      console.error('Scene detection failed:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not detect scenes. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-headline">AI Scene Detection</CardTitle>
        <CardDescription>Automatically find scene changes in your video.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
          {videoPreview ? (
            <video ref={videoRef} src={videoPreview} controls className="w-full h-full" onLoadedMetadata={handleLoadedMetadata} />
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <UploadCloud className="mx-auto h-12 w-12" />
              <p className="mt-2 text-sm">Upload a video to preview</p>
            </div>
          )}
        </div>
        <Input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleDetect} disabled={isLoading || !videoFile} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Detecting...' : 'Detect Scenes'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiSceneDetector;
