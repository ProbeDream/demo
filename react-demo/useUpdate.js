import React, { useEffect, useState } from 'react';
const [n, setN] = useState(0);

const useX = (n) => {
  const [nUpdatedCount, setUpdated] = useState(0);
  useEffect(() => {
    setUpdated((x) => x + 1);
  }, [n]);
  return { nUpdatedCount };
};
const { nUpdatedCount } = useX(n);
useEffect(() => {
  if (nUpdatedCount > 1) {
    console.log('n变化了');
  }
}, [nUpdatedCount]);
