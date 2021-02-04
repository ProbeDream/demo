let _state = [];
let index = 0;
const myUseState = (initialValue) => {
  const currentIndex = index;
  index += 1;
  _state[currentIndex] = _state[currentIndex] || initialValue;
  const setState = (newState) => {
    _state[currentIndex] = newState;
    render();
  };
  return [_state[currentIndex], setState];
};

const App = () => {
  const [m, setN] = myUseState(0);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
    </div>
  );
};

const render = () => {
  index = 0;
  ReactDOM.render(<App />, rootElement);
};
