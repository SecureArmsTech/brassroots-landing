'use client';

import React, { useState, FormEvent } from 'react';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'buyer' | 'builder' | ''>('');
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
                    source: localStorage.getItem('br_src') || null,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error?.message || 'Signup failed');
            }

            setMessage('Thank you for joining the wait-list!');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Signup error:', err.message);
            } else {
                console.error('Signup error:', err);
            }
            setMessage('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name or Nick"
                required
            />
            <div>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="buyer"
                        onChange={() => setRole('buyer')}
                        checked={role === 'buyer'}
                        required
                    />{' '}
                    Buyer
                </label>
                <label className="ml-4">
                    <input
                        type="radio"
                        name="role"
                        value="builder"
                        onChange={() => setRole('builder')}
                        checked={role === 'builder'}
                    />{' '}
                    Builder
                </label>
            </div>
            <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : message === '' ? 'Join Wait-list' : 'Joined!'}
            </button>
            {message && (
                <p
                    className={
                        message.toLowerCase().includes('thank')
                            ? 'text-green-600'
                            : 'text-red-600'
                    }
                >
                    {message}
                </p>
            )}
        </form>
    );
}
