// src/components/SignupForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';

declare global {
  interface Window {
    plausible?: (eventName: string) => void;
  }
}

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    // Default to 'buyer' so Seller never appears selected by default
    const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    role,
                    channel_source: localStorage.getItem('br_src') || null,
                }),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result?.error?.message || 'Signup failed');
            }

            // Fire Plausible goal event
            if (typeof window !== 'undefined' && window.plausible) {
                window.plausible('signup');
            }

            setMessage('Thank you for joining the wait-list!');
        } catch (err: unknown) {
            console.error('Signup error:', err);
            setMessage('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="mt-1 block w-full border border-gray-300 bg-white text-black rounded p-2"
                />
            </div>

            <div>
                <label htmlFor="name" className="block text-sm font-medium">
                    Name or Nick
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name or Nick"
                    required
                    className="mt-1 block w-full border border-gray-300 bg-white text-black rounded p-2"
                />
            </div>

            <fieldset className="flex items-center space-x-4">
                <legend className="sr-only">Role</legend>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="buyer"
                        onChange={() => setRole('buyer')}
                        checked={role === 'buyer'}
                        required
                        className="focus:ring-blue-500"
                    />
                    <span>Buyer</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="seller"
                        onChange={() => setRole('seller')}
                        checked={role === 'seller'}
                        className="focus:ring-blue-500"
                    />
                    <span>Seller</span>
                </label>
            </fieldset>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                {submitting
                    ? 'Submitting...'
                    : message === ''
                        ? 'Join Wait-list'
                        : 'Joined!'}
            </button>

            {message && (
                <p
                    className={`mt - 2 text - center ${
    message.toLowerCase().includes('thank')
        ? 'text-green-600'
        : 'text-red-600'
} `}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
