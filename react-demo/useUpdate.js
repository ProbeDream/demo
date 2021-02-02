import React, { useEffect, useState } from 'react';
const [n, setN] = useState(0);

const useX = (fn, array) => {
  const [nUpdatedCount, setUpdated] = useState(0);
  useEffect(() => {
    setUpdated((x) => x + 1);
  }, array);
  useEffect(() => {
    if (nUpdatedCount > 1) {
      fn();
    }
  }, [nUpdatedCount]);
};
useX(() => {
  console.log(`变化成功了`);
}, [n]);
