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
import { Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface ExportDialogProps {
    children: ReactNode;
}

export const ExportDialog: FC<ExportDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Export Video</DialogTitle>
          <DialogDescription>Choose your desired format and resolution.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <RadioGroup defaultValue="1080p" className="col-span-3 space-y-2">
              <div>
                <RadioGroupItem value="720p" id="r1" />
                <Label htmlFor="r1" className="ml-2">720p (HD)</Label>
              </div>
              <div>
                <RadioGroupItem value="1080p" id="r2" />
                <Label htmlFor="r2" className="ml-2">1080p (Full HD)</Label>
              </div>
              <div>
                <RadioGroupItem value="4k" id="r3" />
                <Label htmlFor="r3" className="ml-2">4K (Ultra HD)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Start Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
