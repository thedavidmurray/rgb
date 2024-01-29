import React, { useState } from "react";
import { Metadata } from "next";
import { useRouter } from 'next/router';

const HOST = process.env.NEXT_PUBLIC_HOST;

if (!HOST) throw new Error("NEXT_PUBLIC_HOST is not set");

export const metadata: Metadata = {
  title: "RGB Frame",
  openGraph: {
    title: "RGB Frame",
    images: [`${HOST}/api/image`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:post_url": `${HOST}/api/vote`,
    "fc:frame:image": `${HOST}/api/image`,
    "fc:frame:button:1": "R",
    "fc:frame:button:2": "G",
    "fc:frame:button:3": "B",
  },
};

export default function Page() {
  const [color, setColor] = useState({ R: 0, G: 0, B: 0 });
  const router = useRouter();

  const handleColorChange = (channel: keyof typeof color, value: number) => {
    setColor(prevColor => ({ ...prevColor, [channel]: Math.max(0, Math.min(255, prevColor[channel] + value)) }));
  };

  const handleMint = async () => {
    // Implement the minting logic here
    // Redirect user to the success or error page based on the minting result
  };

  return (
    <>
      <div>
        <main>
          {/* Display initial gradient and button */}
          <div style={{ background: 'linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet)' }}>
            <button onClick={() => router.push('/mint')}>Follow to mint a canvas</button>
          </div>
          
          {/* The page to select RGB values */}
          {router.pathname === '/mint' && (
            <>
              <div>
                RGB: ({color.R}, {color.G}, {color.B})
                <div style={{ background: `rgb(${color.R},${color.G},${color.B})`, width: '50px', height: '50px' }} />
              </div>
              <button onClick={() => handleColorChange('R', 5)}>R</button>
              <button onClick={() => handleColorChange('G', 5)}>G</button>
              <button onClick={() => handleColorChange('B', 5)}>B</button>
              <button onClick={handleMint}>MINT!</button>
            </>
          )}
        </main>
      </div>
    </>
  );
}
