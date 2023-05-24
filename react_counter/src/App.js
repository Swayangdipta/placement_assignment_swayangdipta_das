import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-app">
      <h1>Counter App</h1>
      <p className="count">Count: {count}</p>
      <div className="buttons">
        <button className="increment-btn" onClick={increment}>
          Increment
        </button>
        <button className="decrement-btn" onClick={decrement}>
          Decrement
        </button>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
