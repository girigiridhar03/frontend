export function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= delay) {
        lastCall = now;
      func.apply(this, args);
    }
  };
}
