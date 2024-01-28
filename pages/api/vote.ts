import type { NextApiRequest, NextApiResponse } from 'next';
import { kv } from "@vercel/kv";
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";

const HUB_URL = "nemes.farcaster.xyz:2283";
const client = getSSLHubRpcClient(HUB_URL);

const HOST = process.env.NEXT_PUBLIC_HOST;
export const RGB_KEYS = { R: "R_COUNT", G: "G_COUNT", B: "B_COUNT" };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            let validatedMessage: Message | undefined = undefined;
            try {
                const frameMessage = Message.decode(Buffer.from(req.body?.trustedData?.messageBytes || '', 'hex'));
                const result = await client.validateMessage(frameMessage);
                if (result.isOk() && result.value.valid) {
                    validatedMessage = result.value.message;
                }
            } catch (e) {
                return res.status(400).send(`Failed to validate message: ${e}`);
            }

            const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
            const colorKey = buttonId === 1 ? RGB_KEYS.R : buttonId === 2 ? RGB_KEYS.G : RGB_KEYS.B; // Assuming 1=R, 2=G, 3=B
            const currentCount = (await kv.get<number>(colorKey)) ?? 0;

            await kv.set<number>(colorKey, (currentCount + 1) % 256); // Increment and wrap around if over 255

            console.log(`Button pressed: ${colorKey}, new count: ${await kv.get<number>(colorKey)}`);

            const imageUrl = `${HOST}/api/image?color=${colorKey}&count=${await kv.get<number>(colorKey)}&noCache=${Math.floor(Math.random() * 500)}`;

            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>RGB Frame</title>
          <meta property="og:title" content="RGB Color Updated">
          <meta property="og:image" content="${imageUrl}">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="${imageUrl}">
          <meta name="fc:frame:post_url" content="${HOST}/api/vote">
          <meta name="fc:frame:button:1" content="R">
          <meta name="fc:frame:button:2" content="G">
          <meta name="fc:frame:button:3" content="B">
        </head>
        <body>
          <p>You have adjusted the color: ${colorKey}.</p>
        </body>
      </html>
    `);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error processing request');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;
