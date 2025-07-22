import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Video, Rocket, BookOpen } from 'lucide-react';
import Image from 'next/image';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-lg">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 bg-primary/20 rounded-lg text-primary">{icon}</div>
      <h3 className="text-lg font-headline font-bold text-foreground">{title}</h3>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function OnboardingPage() {
  return (
    <div className="w-full text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 bg-background/80 backdrop-blur-sm border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold font-headline">Vividly</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 md:pt-32">
        <section className="text-center px-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-3xl"></div></div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline">
            Create Professional Videos with AI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your AI co-pilot for crafting stunning video essays, product launches, vlogs, and more. Describe your vision, and let our AI bring it to life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/signup">
                <Button size="lg" className="text-lg h-12 px-8">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating for Free
                </Button>
            </Link>
          </div>
        </section>

        {/* Video/Image Preview */}
        <section className="mt-16 px-4">
          <div className="relative max-w-5xl mx-auto p-2 rounded-xl bg-gradient-to-tr from-primary/30 to-white/10 shadow-2xl">
              <Image
                src="https://placehold.co/1200x675"
                alt="App Screenshot"
                width={1200}
                height={675}
                className="rounded-lg"
                data-ai-hint="futuristic video editor"
              />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24 py-16 bg-background/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center font-headline mb-12">
              A Powerful Toolkit for Modern Creators
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<Video size={24} />} 
                    title="Video Essays & Vlogs" 
                    description="Transform your scripts into engaging visual stories. Perfect for educational content and personal vlogs."
                />
                <FeatureCard 
                    icon={<Rocket size={24} />} 
                    title="Product Launches" 
                    description="Generate professional-grade launch videos and promotional clips that capture attention and drive sales."
                />
                 <FeatureCard 
                    icon={<BookOpen size={24} />} 
                    title="For Students & Hackers" 
                    description="Create compelling video presentations for school projects or showcase your indie-hacker project with a stunning demo."
                />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10 mt-16">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Vividly. All rights reserved.</p>
      </footer>
    </div>
  );
}
