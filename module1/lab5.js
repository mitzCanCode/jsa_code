let a = { x: [1, 2, 3, 4, 5], y: 0, z: { m: "test", n: false } };
let b = { x: [1, 2, 3, 4, 5], y: 0, z: { m: "test", n: false } };
let c = { x: [1, 2, 3, 4, 5, 6], y: 0, z: { m: "test", n: false } };
let d = { x: [1, 2, 3, 4], y: 0, z: { m: "test", n: false } };
let e = { x: [1, 2, 3, 4, 5], y: 0, z: { m: "test", n: true } };
let f = { x: [1, 2, 3, 4, 5], y: -1, z: { m: "test", n: false } };

function deepComp(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (typeof obj1[key] === "object" && obj1[key] !== null) {
      if (!deepComp(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

console.log(deepComp(a, b)); // -> true
console.log(deepComp(a, c)); // -> false
console.log(deepComp(a, d)); // -> false
console.log(deepComp(a, e)); // -> false
console.log(deepComp(a, f)); // -> false
