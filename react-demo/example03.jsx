import React, { useEffect, useState } from 'react';
const App = (props) => {
  const [childVisible, setChildVisible] = useState(true);
  const show = () => {
    setChildVisible(true);
  };
  const hide = () => {
    setChildVisible(false);
  };
  return (
    <div>
      {childVisible ? (
        <button onClick={hide}>hide</button>
      ) : (
        <button onClick={show}>show</button>
      )}
      {childVisible ? <Child /> : null}
    </div>
  );
};

const Child = () => {
  useEffect(() => {
    console.log('渲染或者变化了');
    return () => {
      console.log('Child销毁了');
    };
  });
  return <div>Child</div>;
};

export default App;
