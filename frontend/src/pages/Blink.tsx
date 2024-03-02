import  { useState, useEffect } from 'react';

export function Blink() {
  const letters = ['M'];
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: Math.random() * 100, // Random top position within the containing element
        left: Math.random() * 100, // Random left position within the containing element
      });
      setVisibleLetters((prevVisibleLetters) => {
        const nextVisibleLetters = [...prevVisibleLetters];
        const nextIndex = (prevVisibleLetters.length + 1) % letters.length;
        if (!nextVisibleLetters.includes(nextIndex)) {
          nextVisibleLetters.push(nextIndex);
        }
        return nextVisibleLetters;
      });
    }, 5000); // Repeat every 500ms to switch to the next letter

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [visibleLetters]);

  return (
    <>
    <div style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid black' }}>
      {letters.map((letter, index) => (
        <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${position.top}%`, left: `${position.left}%` }}
        >
          {/* Display the current letter */}
          {letter}
          <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${Math.floor(Math.random() * 100)}px`, left: `${Math.floor(Math.random() * 100)}px` }}
        >
          {/* Display the current letter */}
          {letter}
        </div>
        <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${Math.floor(Math.random() * 100)}px`, left: `${Math.floor(Math.random() * 100)}px` }}
        >
          {/* Display the current letter */}
          {letter}
        </div>
        <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${Math.floor(Math.random() * 100)}px`, left: `${Math.floor(Math.random() * 100)}px` }}
        >
          {/* Display the current letter */}
          {letter}
        </div>
        <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${Math.floor(Math.random() * 100)}px`, left: `${Math.floor(Math.random() * 100)}px` }}
        >
          {/* Display the current letter */}
          {letter}
        </div>
        <div
          key={index}
          className={`fixed transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-black ${
            visibleLetters.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${Math.floor(Math.random() * 100)}px`, left: `${Math.floor(Math.random() * 100)}px` }}
        >
          {/* Display the current letter */}
          {letter}
        </div>
        
        </div>
        
      )
      )}
      </div>
    </>
  );
};

export default Blink;
