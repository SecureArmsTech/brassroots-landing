// src/pages/api/signup.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// API handler for POST /api/signup
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'Method not allowed' } });
    }

    // Destructure input from request body
    const { email, name, role, fields } = req.body;

    // Validate required fields
    if (!email || !name || !role) {
        return res.status(400).json({ error: { message: 'Missing required fields' } });
    }

    // Safely extract optional UTM parameters
    const utm_source = fields?.utm_source || null;
    const utm_medium = fields?.utm_medium || null;
    const utm_campaign = fields?.utm_campaign || null;

    // In test mode (CI/E2E), skip real network request
    if (process.env.NODE_ENV === 'test') {
        return res.status(200).json({ message: 'Mocked success in test mode' });
    }

    try {
        const apiKey = process.env.MAILERLITE_API_KEY;
        const listId = process.env.MAILERLITE_LIST_ID;

        // Ensure required secrets exist
        if (!apiKey) throw new Error('Missing MAILERLITE_API_KEY');
        if (!listId) throw new Error('Missing MAILERLITE_LIST_ID');

        // Construct MailerLite subscriber payload
        const payload = {
            email,
            name,
            fields: {
                role,
                utm_source,     // e.g. "reddit"
                utm_medium,     // e.g. "cpc"
                utm_campaign    // e.g. "pilot_launch"
            },
            groups: [listId],

            // ✅ This ensures fields are updated for existing emails
            resubscribe: true
        };

        // Send POST request to MailerLite API
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Handle non-200 responses from MailerLite
        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error });
        }

        // Success
        return res.status(200).json({ message: 'Signup successful' });

    } catch (err: unknown) {
        // Robust error logging and fallback
        if (err instanceof Error) {
            return res.status(500).json({ error: { message: err.message } });
        }
        return res.status(500).json({ error: { message: 'Unknown error occurred' } });
    }
}
