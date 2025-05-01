// src/pages/index.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import SignupForm to ensure it's properly loaded without SSR issues
const SignupForm = dynamic(() => import('@/components/SignupForm'), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
});

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <SignupForm />
    </main>
  );
}
