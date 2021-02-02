import React, { useEffect, useState } from 'react';
const [n, setN] = useState(0);

const useUpdate = (fn, array) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((x) => x + 1);
  }, array);
  useEffect(() => {
    if (count > 1) {
      fn();
    }
  }, [count]);
};
useUpdate(() => {
  console.log(`变化成功了`);
}, [n]);
