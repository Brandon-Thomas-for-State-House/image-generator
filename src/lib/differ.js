export default (objA: {}, objB: {}) => (propName: string) =>
  objA[propName] !== objB[propName];
