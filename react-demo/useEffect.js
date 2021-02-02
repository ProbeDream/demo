import { useEffect } from 'react';
/* 
    1. componentDidMount
*/
useEffect(() => {
  console.log('第一次渲染');
}, []);

/* 
    2. componentDidUpdate
*/
useEffect(() => {
  console.log('任意属性变更了');
});
useEffect(() => {
  console.log('n变了');
}, [n]);

/* 
    3. componentWillUnmount
*/
useEffect(() => {
  console.log('第一次渲染');
  return () => {
    console.log('组件要死了');
  };
});
