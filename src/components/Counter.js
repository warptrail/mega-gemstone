import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h4>Counter</h4>
      <p>{count}</p>
      <button onClick={countUp}>count up</button>
    </div>
  );
};

export default Counter;
