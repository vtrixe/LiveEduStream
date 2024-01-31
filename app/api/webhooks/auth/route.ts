import type { NextApiRequest, NextApiResponse } from 'next';

// Name the function
export async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const { event, user } = req.body;

    try {
      console.log('Webhook Event:', event);
      console.log('User Data:', user);

      res.status(200).json({ message: 'Webhook received and processed successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Error processing webhook' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
