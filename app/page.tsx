import React, { useState } from "react";

export default function Page() {
  const [color, setColor] = useState({ R: 0, G: 0, B: 0 });
  const [page, setPage] = useState('home'); // New state to manage page views

  // Increment color values
  const handleColorChange = (channel) => {
    setColor(prevColor => ({
      ...prevColor,
      [channel]: prevColor[channel] < 255 ? prevColor[channel] + 1 : 0
    }));
  };

  // Mock mint function
  const handleMint = () => {
    alert("Sorry, I'm not that competent, hehe");
  };

  // Conditional rendering based on the current page
  const renderContent = () => {
    switch(page) {
      case 'home':
        return (
          <div style={{ background: 'linear-gradient(to right, red, orange, yellow, green, cyan, blue, violet)' }}>
            <button onClick={() => setPage('mint')}>Follow to mint a canvas</button>
          </div>
        );
      case 'mint':
        return (
          <>
            <div>RGB: ({color.R}, {color.G}, {color.B})</div>
            <div style={{ background: `rgb(${color.R},${color.G},${color.B})`, width: '50px', height: '50px' }} />
            <button onClick={() => handleColorChange('R')}>R</button>
            <button onClick={() => handleColorChange('G')}>G</button>
            <button onClick={() => handleColorChange('B')}>B</button>
            <button onClick={() => setPage('canvas')}>MINT!</button>
          </>
        );
      case 'canvas':
        return (
          <div style={{ background: `rgb(${color.R},${color.G},${color.B})`, width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={handleMint} style={{ fontSize: '20px', padding: '10px' }}>MINT!</button>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <main>
      {renderContent()}
    </main>
  );
}
