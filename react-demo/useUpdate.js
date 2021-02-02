import React, { useEffect, useState } from 'react';
const [n, setN] = useState(0);

const useUpdate = (fn, dep) => {
  /* 对应的react不确定传入的dep是否是一个动态数组 数组长度不确定的数组  */
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((x) => x + 1);
  }, [dep]);
  useEffect(() => {
    if (count > 1) {
      fn();
    }
  }, [count]);
};
useUpdate(() => {
  console.log(`变化成功了`);
}, n);
