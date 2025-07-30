import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-25"></div>
           <Image
              src="/logo.png"
              alt="Quiz App Logo"
              width={96}
              height={96}
              className="relative glow"
              priority
            />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
          Crypto Quiz Challenge
        </h1>
        <p className="max-w-xl text-muted-foreground font-body text-lg">
          Test your knowledge of the crypto world. Answer challenging questions and see how high you can score!
        </p>
         <Link href="/quiz" passHref>
          <Button variant="default" size="lg" className="text-lg py-7 px-8 group mt-4">
            Start Quiz <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
