import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { login, signup } from './actions';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const isLogin = mode === 'login';
  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const description = isLogin ? 'Enter your credentials to access your studio.' : 'Join to start creating with AI.';
  const buttonText = isLogin ? 'Log In' : 'Sign Up';
  const footerText = isLogin ? "Don't have an account?" : 'Already have an account?';
  const footerLink = isLogin ? '/signup' : '/login';
  const footerLinkText = isLogin ? 'Sign Up' : 'Log In';

  const action = isLogin ? login : signup;

  return (
    <Card className="w-full max-w-xs">
        <form action={action}>
            <CardHeader className="text-center p-4">
                <div className="mx-auto mb-2 p-1 bg-primary/20 rounded-lg w-fit">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-headline">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 px-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4">
                <Button type="submit" className="w-full">{buttonText}</Button>
                 <div className="text-center text-sm text-muted-foreground">
                    {footerText}{' '}
                    <Link href={footerLink} className="underline hover:text-primary">
                        {footerLinkText}
                    </Link>
                </div>
            </CardFooter>
        </form>
    </Card>
  );
};
