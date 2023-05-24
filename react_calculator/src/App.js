import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [result, setResult] = useState('0');

  const handleNumberClick = (number) => {
    setResult((prevResult) => {
      return prevResult === '0' ? number : prevResult + number;
    });
  };

  const handleClearClick = () => {
    setResult('0');
  };

  const handleEqualsClick = () => {
    setResult((prevResult) => {
      try {
        return eval(prevResult).toString();
      } catch (error) {
        console.error('Invalid expression:', error);
        return 'Error';
      }
    });
  };

  return (
    <div className='container'>
    <div className="calculator">
      <div className="result">{result}</div>
      <div className="buttons">
        <div className="row">
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={handleClearClick} className="clear-button">
            C
          </button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleNumberClick('+')}>+</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleNumberClick('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={() => handleNumberClick('.')}>.</button>
          <button onClick={() => handleNumberClick('*')}>*</button>
          <button onClick={() => handleNumberClick('/')}>/</button>
        </div>
        <div className="row">
          <button onClick={handleEqualsClick} className="equals-button">
            =
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
