'use client';

import type { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Download, Sparkles, Wand2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';


interface ExportDialogProps {
    children: ReactNode;
}

export const ExportDialog: FC<ExportDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Export Generation</DialogTitle>
          <DialogDescription>Configure export settings and apply final enhancements.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="format" className="text-right">
                    Format
                </Label>
                <Select defaultValue="mp4">
                    <SelectTrigger id="format" className="col-span-3">
                        <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mp4">MP4</SelectItem>
                        <SelectItem value="mov">MOV</SelectItem>
                        <SelectItem value="webm">WebM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Resolution</Label>
            <RadioGroup defaultValue="1080p" className="col-span-3 grid grid-cols-2 gap-y-2">
              <div><RadioGroupItem value="1080p" id="r1" /> <Label htmlFor="r1" className="ml-2 font-normal">1080p (FHD)</Label></div>
              <div><RadioGroupItem value="4k" id="r2" /> <Label htmlFor="r2" className="ml-2 font-normal">4K (UHD)</Label></div>
              <div><RadioGroupItem value="8k" id="r3" /> <Label htmlFor="r3" className="ml-2 font-normal">8K (Cinematic)</Label></div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Frame Rate</Label>
            <RadioGroup defaultValue="30fps" className="col-span-3 grid grid-cols-2 gap-y-2">
              <div><RadioGroupItem value="30fps" id="f1" /> <Label htmlFor="f1" className="ml-2 font-normal">30 fps</Label></div>
              <div><RadioGroupItem value="60fps" id="f2" /> <Label htmlFor="f2" className="ml-2 font-normal">60 fps</Label></div>
            </RadioGroup>
          </div>
          <div className='space-y-4 rounded-lg border border-border p-4'>
            <h4 className='flex items-center font-semibold text-sm'><Wand2 className="mr-2 h-4 w-4 text-primary" /> AI Upscaling & Enhancement</h4>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enhance-clarity" className="flex flex-col space-y-1">
                    <span>Enhance Clarity</span>
                    <span className="font-normal leading-snug text-muted-foreground text-xs">
                    Improves detail and sharpness.
                    </span>
                </Label>
                <Switch id="enhance-clarity" />
            </div>
             <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="smooth-motion" className="flex flex-col space-y-1">
                    <span>Smooth Motion (Frame Interpolation)</span>
                     <span className="font-normal leading-snug text-muted-foreground text-xs">
                    Reduces choppiness for fluid motion.
                    </span>
                </Label>
                <Switch id="smooth-motion" defaultChecked />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
