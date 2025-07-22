'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { createSession } from './actions';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.88 1.62-4.41 0-7.99-3.59-7.99-7.99s3.58-7.99 7.99-7.99c2.35 0 3.96.94 4.84 1.79l2.5-2.5C18.16 3.18 15.79 2 12.48 2c-6.19 0-11.24 5.04-11.24 11.24s5.05 11.24 11.24 11.24c6.77 0 10.43-4.43 10.43-10.14 0-.68-.06-1.3-.17-1.92H12.48z" fill="currentColor"/>
    </svg>
);


export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { toast } = useToast();
  const router = useRouter();
  const isLogin = mode === 'login';
  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const description = isLogin ? 'Enter your credentials to access your studio.' : 'Join to start creating with AI.';
  const buttonText = isLogin ? 'Log In' : 'Sign Up';
  const footerText = isLogin ? "Don't have an account?" : 'Already have an account?';
  const footerLink = isLogin ? '/signup' : '/login';
  const footerLinkText = isLogin ? 'Sign Up' : 'Log In';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      
      const idToken = await userCredential.user.getIdToken();
      const result = await createSession(idToken);
      if (!result?.success) {
        // The server action might return an error if session creation fails
         throw new Error(result?.error || "Could not create session.");
      }
      // Redirect is handled by the server action or by this client if needed
      router.push('/studio');
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || 'Please check your credentials and try again.',
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        const sessionResult = await createSession(idToken);
         if (!sessionResult?.success) {
            throw new Error(sessionResult?.error || "Could not create session.");
         }
         // Redirect is handled by the server action or by this client if needed
         router.push('/studio');
    } catch (error: any) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Google Sign-In Failed",
            description: error.message || 'Could not sign in with Google. Please try again.',
        });
        setIsGoogleLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-xs">
        <CardHeader className="text-center p-4">
            <div className="mx-auto mb-2 p-1 bg-primary/20 rounded-lg w-fit">
                <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-headline">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 px-4">
             <Button size="sm" variant="outline" type="button" onClick={handleGoogleSignIn} disabled={isGoogleLoading || isLoading} className="w-full">
                {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <GoogleIcon className="mr-2 h-4 w-4" />
                )}
                Continue with Google
            </Button>

             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>

            <form onSubmit={handleAuthAction} className="grid gap-2">
                <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading || isGoogleLoading} className="h-9 text-sm" />
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading || isGoogleLoading} className="h-9 text-sm" />
                </div>
                <Button size="sm" type="submit" className="w-full mt-2" disabled={isLoading || isGoogleLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {buttonText}
                </Button>
            </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-4 pt-0">
             <div className="text-center text-sm text-muted-foreground">
                {footerText}{' '}
                <Link href={footerLink} className="underline hover:text-primary">
                    {footerLinkText}
                </Link>
            </div>
        </CardFooter>
    </Card>
  );
};
