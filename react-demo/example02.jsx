import React, { useState } from 'react';

const App = (props) => {
  const [n, setN] = useState(0);
  const onClick = () => {
    setN(n + 1);
  };
  return (
    <div>
      {n}
      <button onClick={onClick}>+1</button>
    </div>
  );
};

export default App;
