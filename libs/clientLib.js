export function makeFuncDebounce(func, miliSec = 1000) {
  let id = null;
  return function (...args) {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      func(...args);
    }, miliSec);
  };
}
