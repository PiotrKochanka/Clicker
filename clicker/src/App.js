import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [number, setNumber] = useState(() => {
    const savedNumber = localStorage.getItem('number');
    return savedNumber ? JSON.parse(savedNumber) : 0;
  });


  useEffect(() => {
    const clickNumber = () => {
      setNumber((prev) => {
        const newNumber = prev + 1;
        localStorage.setItem('number', JSON.stringify(newNumber));
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
      <span className="low">{number}</span>
      <button onClick={removeNumber}>Reset</button>
    </div>
  );
}

export default App;
