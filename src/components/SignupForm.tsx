import { useState } from 'react';

type Role = 'buyer' | 'seller';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>('buyer');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Utility: Get channel source from localStorage, default to "direct"
    function getChannelSource(): string {
        if (typeof window !== "undefined") {
            return localStorage.getItem("br_src") || "direct";
        }
        return "direct";
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('idle');
        try {
            const payload = {
                email,
                name,
                role,
                fields: {
                    source: getChannelSource(),
                },
            };

            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
                setName('');
                setRole('buyer');
            } else {
                throw new Error('Signup failed');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mt-1 block w-full border rounded p-2"
                    autoComplete="email"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Name or Nick</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 block w-full border rounded p-2"
                    autoComplete="name"
                />
            </div>
            <fieldset className="flex space-x-4">
                <legend className="sr-only">Role</legend>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="buyer"
                        checked={role === 'buyer'}
                        onChange={() => setRole('buyer')}
                    />
                    <span>Buyer</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="role"
                        value="seller"
                        checked={role === 'seller'}
                        onChange={() => setRole('seller')}
                    />
                    <span>Seller</span>
                </label>
            </fieldset>
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded"
                disabled={status === 'success'}
            >
                {status === 'success' ? "Joined!" : "Join Wait-list"}
            </button>
            {status === 'success' && (
                <p className="text-green-600">Thank you for joining the wait-list!</p>
            )}
            {status === 'error' && (
                <p className="text-red-600">Oops—something went wrong.</p>
            )}
        </form>
    );
}
