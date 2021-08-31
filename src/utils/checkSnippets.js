// to check type, number and string

/** isObject */
export const isObject = obj => obj === Object(obj);
// isObject([3,4])      // true
// isObject({x: 4})     // true

/** isPrimitive type */
export const isPrimitive = value => Object(value) !== value;
// isPrimitive('hello!')    // true
// isPrimitive([])          // false

/** isDivisible */
export const isDivisible = (x, y) => x % y === 0;

/** isNum */
// eslint-disable-next-line no-self-compare
export const isNum = value => typeof(value) === 'number' && value === value;

/** isEven & isOdd */
export const isEven = num => num % 2 === 0;
export const isOdd = num => num % 2 === 1;

/** isLowerCase & isUpperCase */
export const isLowerCase = str => str === str.toLowerCase();
export const isUpperCase = str => str === str.toUpperCase();

