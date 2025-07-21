import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, Wand2 } from 'lucide-react';
import ColorGrading from '@/components/color-grading';

const RightPanel: FC = () => {
  return (
    <aside className="w-[300px] bg-card flex flex-col border-l border-border">
       <div className="p-2">
        <Tabs defaultValue="color">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="color">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Color
            </TabsTrigger>
            <TabsTrigger value="effects">
              <Wand2 className="w-4 h-4 mr-2" />
              Effects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="color" className="mt-2">
            <ColorGrading />
          </TabsContent>
          <TabsContent value="effects" className="mt-2">
            <div className="p-4 text-center text-muted-foreground">
              Effects controls will be here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
};

export default RightPanel;
