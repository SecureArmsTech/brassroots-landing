// src/pages/index.tsx
import SignupForm from '@/components/SignupForm';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <SignupForm />
    </main>
  );
}