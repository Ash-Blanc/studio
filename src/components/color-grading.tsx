'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface SliderControlProps {
    label: string;
    value: number;
    onValueChange: (value: number[]) => void;
}

const SliderControl: FC<SliderControlProps> = ({ label, value, onValueChange }) => (
    <div className="grid gap-2">
        <div className="flex justify-between items-center">
            <Label htmlFor={label.toLowerCase()}>{label}</Label>
            <span className="text-sm font-mono text-muted-foreground w-10 text-right">{value}</span>
        </div>
        <Slider
            id={label.toLowerCase()}
            min={-100}
            max={100}
            step={1}
            value={[value]}
            onValueChange={onValueChange}
        />
    </div>
);


const ColorGrading: FC = () => {
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [saturation, setSaturation] = useState(0);
    const [temperature, setTemperature] = useState(0);

    const handleReset = () => {
        setBrightness(0);
        setContrast(0);
        setSaturation(0);
        setTemperature(0);
    };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Color Grading</CardTitle>
        <CardDescription>Adjust the color of your video.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SliderControl label="Brightness" value={brightness} onValueChange={(v) => setBrightness(v[0])} />
        <SliderControl label="Contrast" value={contrast} onValueChange={(v) => setContrast(v[0])} />
        <SliderControl label="Saturation" value={saturation} onValueChange={(v) => setSaturation(v[0])} />
        <SliderControl label="Temperature" value={temperature} onValueChange={(v) => setTemperature(v[0])} />

        <Button variant="secondary" className="w-full" onClick={handleReset}>Reset All</Button>
      </CardContent>
    </Card>
  );
};

export default ColorGrading;
