import IQ from "@/components/IQ";
import { IQ_KEY } from "@/pages/api/vote";
import { kv } from "@vercel/kv";
import { Metadata } from "next";
import { useEffect, useState } from "react";

const HOST = process.env.NEXT_PUBLIC_HOST;

if (!HOST) throw new Error("NEXT_PUBLIC_HOST is not set");

export const metadata: Metadata = {
    title: "RGB Frame",
    openGraph: {
        title: "RGB Frame",
        images: ["/api/image"],
    },
    other: {
        "fc:frame": "vNext",
        "fc:frame:post_url": `${HOST}/api/vote`,
        "fc:frame:image": `${HOST}/api/image`,
        // Update the button names to R, G, B
        "fc:frame:button:1": "R",
        "fc:frame:button:2": "G",
        "fc:frame:button:3": "B",
    },
};

export default function Page() {
    const [rgbCounts, setRgbCounts] = useState({ R: 0, G: 0, B: 0 });

    useEffect(() => {
        // Fetch the initial RGB counts when the component mounts
        // This is where you would fetch the data from your backend or Vercel KV
    }, []);

    const handleRgbButtonClick = (color) => {
        setRgbCounts((prevCounts) => ({
            ...prevCounts,
            [color]: (prevCounts[color] + 1) % 256,
        }));

        // After updating the state, you would typically make a POST request to
        // your backend to persist the new count
    };

    const backgroundColor = `rgb(${rgbCounts.R}, ${rgbCounts.G}, ${rgbCounts.B})`;

    return (
        <>
            <div>
                <main>
                    <div
                        style={{
                            backgroundColor,
                            width: '200px',
                            height: '200px',
                            margin: 'auto',
                        }}
                    >
                        RGB Color Box
                    </div>
                    <div>
                        <button onClick={() => handleRgbButtonClick('R')}>R</button>
                        <button onClick={() => handleRgbButtonClick('G')}>G</button>
                        <button onClick={() => handleRgbButtonClick('B')}>B</button>
                    </div>
                    <IQ />
                </main>
            </div>
        </>
    );
}
