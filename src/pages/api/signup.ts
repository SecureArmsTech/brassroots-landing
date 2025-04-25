// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    success: boolean;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res
            .status(405)
            .json({ success: false, message: 'Method Not Allowed' });
    }

    const { email, name, role } = req.body as {
        email?: string;
        name?: string;
        role?: string;
    };

    if (!email || !name || !role) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing required fields' });
    }

    try {
        const mlResponse = await fetch(
            'https://api.mailerlite.com/api/v2/subscribers',
            {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                    'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY!,
                },
                body: JSON.stringify({
                    email,
                    fields: { name, role },
                    groups: [process.env.MAILERLITE_LIST_ID!],
                }),
            }
        );

        if (!mlResponse.ok) {
            const errorText = await mlResponse.text();
            console.error('MailerLite error:', errorText);
            return res
                .status(500)
                .json({ success: false, message: 'Subscription failed' });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Unhandled error:', err);
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' });
    }
}
