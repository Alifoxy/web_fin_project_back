export function GenNum(): PropertyDecorator {
  // const target = Date.now() + Math.random();
  return () => {
    return Date.now() + Math.random();
  };
}

// export function GNum() {
//   return Date.now;
// }
