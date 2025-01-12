
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [number, setNumber] = useState(() => {
    const savedNumber = localStorage.getItem('number');
    return savedNumber ? JSON.parse(savedNumber) : 0;
  });

  const [redShades, setRedShades] = useState([
    "#00BB00", 
    "#00D400", 
    "#00E800",
    "#00F100",
    "#00FF00", 
    "#85FF00",
    "#B0FF00",
    "#E2FF00",
    "#FFFF00",
    "#FFE200",
    "#FFBE00",
    "#FF9900",
    "#FF7C00",
    "#FF5D00",
    "#FF3F00",
    "#FF2400",
    "#FF0B00",
    "#FF0000",
  ]);

  const [currentColorIndex, setCurrentColorIndex] = useState(() => {
    const savedColor = localStorage.getItem('currentColorIndex');
    return savedColor ? JSON.parse(savedColor) : 0;
  });

  useEffect(() => {
    const clickNumber = () => {
      setNumber((prev) => {
        const newNumber = prev + 1;
        localStorage.setItem('number', JSON.stringify(newNumber));

        /* Zmiana koloru co 3 kliknięcia */
        if ((newNumber % 8 === 0) && currentColorIndex < redShades.length - 1) {
          setCurrentColorIndex((prevIndex) => {
            const newColor = prevIndex + 1;
            localStorage.setItem('currentColorIndex', JSON.stringify(newColor));
          });
        }

        return newNumber;
      });
    };

    document.addEventListener('click', clickNumber);

    return () => document.removeEventListener('click', clickNumber);
  });

  const removeNumber = () => {
    setNumber((prev) => prev == prev ? (0-1) : prev);
  }

  return (
    <div className="App">
      <span 
        className={`low ${number >= 60 ? "shake" : ""}`}
        style={{ color: redShades[currentColorIndex] }}
      >{number}</span>
      <button onClick={removeNumber}>Reset</button>
    </div>
  );
}

export default App;
