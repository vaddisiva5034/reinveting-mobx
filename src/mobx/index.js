let accesedObserver = [];
const observerRunners = {};

const observable = (targetObject) => {
  return new Proxy(targetObject, {
    get(obj, key) {
      const isAvailable = accesedObserver.includes(key);
      if (!isAvailable) accesedObserver.push(key);
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      observerRunners[key].forEach((fn) => {
        fn();
      });
      return obj;
    }
  });
};

const observer = (fn) => {
  accesedObserver = [];
  fn();
  accesedObserver.forEach((key) => {
    observerRunners[key] = observerRunners[key] || [];
    observerRunners[key].push(fn);
  });
};
export { observable, observer };
