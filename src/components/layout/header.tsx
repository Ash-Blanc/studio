import type { FC } from 'react';
import { Sparkles, Download, User, Share2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExportDialog } from '@/components/export-dialog';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from './actions';


const Header: FC = () => {
  return (
    <header className="flex items-center justify-between h-14 px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-headline font-bold text-foreground">
          Aetheria Studio
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="hidden sm:inline-flex">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <ExportDialog>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </ExportDialog>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hidden sm:flex cursor-pointer">
                    <AvatarImage src="https://placehold.co/40x40" alt="User" data-ai-hint="woman portrait" />
                    <AvatarFallback>
                        <User className="text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
