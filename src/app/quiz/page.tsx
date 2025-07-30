import { QuizGame } from '@/components/quiz-game';

export default function QuizPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 md:p-8 min-h-screen">
      <div className="w-full max-w-4xl text-center space-y-4 mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Knowledge Arena
        </h1>
        <p className="text-lg text-muted-foreground">
          Sharp mind, fast fingers. Let's see what you've got.
        </p>
      </div>
      <QuizGame />
    </main>
  );
}
