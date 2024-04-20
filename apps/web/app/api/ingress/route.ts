/* eslint-disable no-unused-vars */
/* eslint-disable turbo/no-undeclared-env-vars */


import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';


// Nginx RTMP server URL
const RTMP_SERVER_URL =  'rtmp://localhost:1935/live';

// WebRTC (WHIP) server URL
const WHIP_SERVER_URL = process.env.WHIP_SERVER_URL || 'https://your-server-ip-or-domain/whip';

export  async function POST(req: NextRequest, res: NextApiResponse) {
  const { method, body } = req;

  const session = await currentUser();
  const userId = session.id;
  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  
  switch (method) {
    case 'POST':
      try {


        const data = await req.json();

        const protocol = data.protocol




        console.log(protocol);


        if (!['rtmp', 'whip'].includes(protocol)) {
          return  NextResponse.json({ error: 'Invalid Protocol request' }, { status: 400})
        }



        const streamKey = uuidv4();

        let serverUrl;


        if (protocol === 'rtmp') {
          serverUrl = `${RTMP_SERVER_URL}/${streamKey}`;
        } else if (protocol === 'whip') {
          serverUrl = `${WHIP_SERVER_URL}/${streamKey}`;
        }

        await db.stream.update({
          where: { userId: dbUser?.id },
          data: {
            serverUrl,
            streamKey,
          },
        });

        return NextResponse.json({ streamKey , serverUrl }, { status: 200})
      } catch (error) {
        console.error(error);
       
        return  NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    default:
      res.setHeader('Allow', ['POST']);
       return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
  }
}

