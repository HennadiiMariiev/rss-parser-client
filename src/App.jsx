import React, { useState } from 'react';

import './index.css';
import img from './images/bot_image.png';

function App() {
  const [counter, setCounter] = useState(100);

  return (
    <div>
      <h1>Hello App!</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter((prev) => (prev += 1))}>+</button>
      <button onClick={() => setCounter((prev) => (prev -= 1))}>-</button>

      <button
        onClick={() => {
          throw new Error();
        }}
      >
        Error
      </button>
      <img src={img} alt="image" width={60} height={60} />
    </div>
  );
}

export default App;
