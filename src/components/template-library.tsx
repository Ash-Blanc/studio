import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const templates = [
  { id: 1, name: 'Product Launch', hint: 'technology product' },
  { id: 2, name: 'Minimalist Promo', hint: 'minimal abstract' },
  { id: 3, name: 'Corporate Intro', hint: 'office business' },
  { id: 4, name: 'Social Story Ad', hint: 'social media' },
  { id: 5, name: 'Tutorial Explainer', hint: 'education screen' },
  { id: 6, name: 'Kinetic Typography', hint: 'bold text' },
];

const TemplateLibrary: FC = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-headline">Template Library</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 gap-4 pr-4">
            {templates.map(template => (
              <div key={template.id} className="group relative rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={`https://placehold.co/400x225/22272e/c2b280`}
                  width={400}
                  height={225}
                  alt={template.name}
                  data-ai-hint={template.hint}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                <h3 className="absolute bottom-2 left-3 text-base font-semibold text-white">
                  {template.name}
                </h3>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TemplateLibrary;
