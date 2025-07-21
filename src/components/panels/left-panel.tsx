'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text, Image as ImageIcon, Video, Bot, Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '../ui/label';

interface LeftPanelProps {
  onGenerate: () => void;
  isLoading: boolean;
}

const LeftPanel: FC<LeftPanelProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <aside className="w-[350px] bg-card flex flex-col border-r border-border">
      <div className="flex-1 p-2 flex flex-col">
        <Tabs defaultValue="text" className="flex flex-col flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text"><Text className="w-4 h-4 mr-2" />Text</TabsTrigger>
            <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-2" />Image</TabsTrigger>
            <TabsTrigger value="video"><Video className="w-4 h-4 mr-2" />Video</TabsTrigger>
          </TabsList>
          <div className="flex-1 mt-2">
            <TabsContent value="text" className="h-full">
              <Card className="border-0 shadow-none h-full flex flex-col">
                <CardContent className="p-2 flex-1">
                  <Textarea
                    placeholder="An epic cinematic shot of a warrior queen on a mountain peak, golden hour lighting, 8K, hyperrealistic..."
                    className="h-full resize-none text-base"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="image">
              <Card className="border-0 shadow-none">
                <CardContent className="p-2 space-y-4">
                  <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <Image src={imagePreview} width={300} height={169} alt="Image preview" className="w-full h-full object-cover"/>
                    ) : (
                      <div className="text-center text-muted-foreground p-4">
                        <ImageIcon className="mx-auto h-12 w-12" />
                        <p className="mt-2 text-sm">Upload an image</p>
                      </div>
                    )}
                  </div>
                  <Input id="image-upload" type="file" accept="image/*" onChange={handleImageFileChange} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="video">
               <Card className="border-0 shadow-none">
                <CardContent className="p-2 space-y-4">
                  <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center">
                    {videoPreview ? (
                      <video src={videoPreview} controls className="w-full h-full" />
                    ) : (
                      <div className="text-center text-muted-foreground p-4">
                        <Video className="mx-auto h-12 w-12" />
                        <p className="mt-2 text-sm">Upload a video</p>
                      </div>
                    )}
                  </div>
                  <Input id="video-upload" type="file" accept="video/*" onChange={handleVideoFileChange} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
          <div className="p-2 space-y-4 border-t border-border mt-auto">
             <div className="grid gap-2">
                <Label htmlFor="model-select">AI Model</Label>
                <Select defaultValue="aether-v3-pro">
                    <SelectTrigger id="model-select">
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="aether-v3-pro">Aetheria v3 Pro</SelectItem>
                        <SelectItem value="aether-v2-turbo">Aetheria v2 Turbo</SelectItem>
                        <SelectItem value="veo-2.0">Google Veo 2.0</SelectItem>
                        <SelectItem value="sora-2-pro">OpenAI Sora 2 Pro</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={onGenerate} disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </Tabs>
      </div>
    </aside>
  );
};

export default LeftPanel;
