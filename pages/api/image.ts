import type { NextApiRequest, NextApiResponse } from 'next';
import Jimp from "jimp";
import { kv } from '@vercel/kv';

// RGB keys as defined in the updated vote.ts
const RGB_KEYS = { R: "R_COUNT", G: "G_COUNT", B: "B_COUNT" };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch the current counts for R, G, and B from the kv store
        const rCount = await kv.get<number>(RGB_KEYS.R) ?? 0;
        const gCount = await kv.get<number>(RGB_KEYS.G) ?? 0;
        const bCount = await kv.get<number>(RGB_KEYS.B) ?? 0;

        // Create a new 340x340 image with a solid color based on the RGB counts
        const image = await new Jimp(340, 340, Jimp.rgbaToInt(rCount, gCount, bCount, 255));

        // Get the image buffer
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

        // Set headers and send the image
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'max-age=10'); // Consider adjusting cache settings as needed
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating image');
    }
}
