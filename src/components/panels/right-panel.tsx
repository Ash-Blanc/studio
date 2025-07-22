
'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, SlidersHorizontal, Palette, ChevronsRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '../ui/switch';
import ColorGrading from '../color-grading';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';


const ParameterControl: FC<{
    label: string;
    value: number;
    onValueChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    description?: string;
}> = ({ label, value, onValueChange, min=0, max=100, step=1, description }) => (
    <div className="grid gap-2">
        <div className="flex justify-between items-center">
            <Label>
                {label}
                {description && <p className="text-xs text-muted-foreground font-normal">{description}</p>}
            </Label>
            <span className="text-sm font-mono text-muted-foreground w-12 text-right">{value}</span>
        </div>
        <Slider
            min={min}
            max={max}
            step={step}
            value={[value]}
            onValueChange={onValueChange}
        />
    </div>
);

const GenerationParameters = () => {
    const [duration, setDuration] = useState(5);
    const [motion, setMotion] = useState(50);
    const [consistency, setConsistency] = useState(80);
    const [adherence, setAdherence] = useState(90);

    return (
        <Card className="border-0 shadow-none">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5"/> Parameters</CardTitle>
                <CardDescription>Fine-tune the generation process for your video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ParameterControl label="Duration (seconds)" description="Set the total length of the video clip." value={duration} onValueChange={(v) => setDuration(v[0])} min={1} max={10} step={1} />
                <ParameterControl label="Motion Amount" description="Controls the intensity of movement and animation." value={motion} onValueChange={(v) => setMotion(v[0])} />
                <ParameterControl label="Temporal Consistency" description="Improves object and character stability over time." value={consistency} onValueChange={(v) => setConsistency(v[0])} />
                <ParameterControl label="Prompt Adherence" description="How strictly the AI follows your text prompt." value={adherence} onValueChange={(v) => setAdherence(v[0])} />
                <div className="flex items-center justify-between space-x-2 pt-2">
                    <Label htmlFor="physics-sim" className="flex flex-col space-y-1">
                        <span>Physics Simulation</span>
                        <span className="font-normal leading-snug text-muted-foreground text-xs">
                        Enable for more realistic physical interactions.
                        </span>
                    </Label>
                    <Switch id="physics-sim" defaultChecked />
                </div>
            </CardContent>
        </Card>
    )
}

const CinematographyControls: FC = () => {
     const [dof, setDof] = useState(20);

    return (
        <Card className="border-0 shadow-none">
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center"><Camera className="mr-2 h-5 w-5"/>Cinematography</CardTitle>
                <CardDescription>Control camera work and professional lens effects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid gap-2">
                    <Label htmlFor="camera-move">Camera Movement</Label>
                    <Select defaultValue="none">
                        <SelectTrigger id="camera-move">
                            <SelectValue placeholder="Select movement" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Static</SelectItem>
                            <SelectItem value="pan-left">Pan Left</SelectItem>
                            <SelectItem value="pan-right">Pan Right</SelectItem>
                            <SelectItem value="tilt-up">Tilt Up</SelectItem>
                            <SelectItem value="tilt-down">Tilt Down</SelectItem>
                             <SelectItem value="dolly-in">Dolly In (Zoom)</SelectItem>
                             <SelectItem value="dolly-out">Dolly Out (Zoom)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="lighting-style">Lighting Style</Label>
                    <Select defaultValue="cinematic">
                        <SelectTrigger id="lighting-style">
                            <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cinematic">Cinematic</SelectItem>
                            <SelectItem value="golden-hour">Golden Hour</SelectItem>
                            <SelectItem value="noir">Film Noir</SelectItem>
                            <SelectItem value="sci-fi-glow">Sci-fi Glow</SelectItem>
                            <SelectItem value="natural">Natural</SelectItem>
                             <SelectItem value="product">Product Studio</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <ParameterControl label="Depth of Field" description="Blurs the background to focus on the subject." value={dof} onValueChange={(v) => setDof(v[0])} />
            </CardContent>
        </Card>
    );
};


interface RightPanelProps {
  onCollapse: () => void;
}

const RightPanel: FC<RightPanelProps> = ({ onCollapse }) => {
  return (
    <aside className="hidden lg:flex lg:w-[300px] bg-card flex-col lg:border-l lg:border-border relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-2 left-2 z-10" onClick={onCollapse}>
              <ChevronsRight className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Collapse Panel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="p-2 pt-12">
        <Tabs defaultValue="params" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="params">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Parameters
            </TabsTrigger>
            <TabsTrigger value="camera">
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </TabsTrigger>
             <TabsTrigger value="color">
              <Palette className="w-4 h-4 mr-2" />
              Color & FX
            </TabsTrigger>
          </TabsList>
          <TabsContent value="params" className="mt-2">
            <GenerationParameters />
          </TabsContent>
          <TabsContent value="camera" className="mt-2">
            <CinematographyControls />
          </TabsContent>
          <TabsContent value="color" className="mt-2">
            <ColorGrading />
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
};

export default RightPanel;
