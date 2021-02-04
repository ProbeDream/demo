import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';

const C = createContext(null);

const App = () => {
  const [n, setN] = useState(0);
  return (
    <C.Provider value={{ n, setN }}>
      <div className="App">
        <Baba />
      </div>
    </C.Provider>
  );
};

const Baba = () => {
  const [n, setN] = useContext(C);
  return (
    <div>
      n:{n}
      <Child />
    </div>
  );
};

const Child = () => {
  const [n, setN] = useContext(C);
  const onClick = () => {
    setN((i) => i + 1);
  };
  return (
    <div>
      n:{n}
      <button onClick={onClick}>+1</button>
    </div>
  );
};

const rootElement = document.getElementById('rootElement');
ReactDOM.render(<App />, rootElement);
