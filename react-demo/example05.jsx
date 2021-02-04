import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [use, setUser] = useState({ name: 'probedream', age: 24 });
  const onClick = () => {
    setUser({ name: 'Julia' });
  };
  return (
    <div className="App">
      <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
