import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

const initial = {
  n: 0,
};

const reducer = (state, action) => {
  if (state.type === 'add') {
    return { n: state.n + action.number };
  } else if (state.type === 'multi') {
    return { n: state.n * 2 };
  } else {
    throw new Error('unknown type');
  }
};

const App = () => {
  const [state, setState] = useReducer(reducer, initial);
  const { n } = state;
  const onClick = () => {
    dispatch({ type: 'add', number: 3 });
  };
  const onClick2 = () => {
    dispatch({ type: 'add', number: 2 });
  };
  return (
    <div className="App">
      <h1>n:{n}</h1>
      <button onClick={onClick}>+3</button>
      <button onClick={onClick2}>+2</button>
    </div>
  );
};

const rootElement = document.getElementById('rootElement');
ReactDOM.render(<App />, rootElement);
