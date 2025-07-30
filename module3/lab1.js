function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSet(n, m, repeat, sorted) {
  let numbers;
  if (!repeat) {
    if (m > n + 1) {
      console.log(
        `Cannot get ${m} unique values from range 0 to ${n} (only ${n + 1} unique values available).`,
      );
      return NaN;
    }
    let numSet = new Set();
    while (numSet.size !== m) {
      numSet.add(randomInt(0, n));
    }
    numbers = Array.from(numSet);
  } else {
    numbers = [];
    while (numbers.length !== m) {
      numbers.push(randomInt(0, n));
    }
  }
  return sorted ? numbers.sort((a, b) => a - b) : numbers;
}

console.log(getRandomSet(10, 20, false, false));
console.log(getRandomSet(10, 20, false, true));
console.log(getRandomSet(10, 20, true, false));
console.log(getRandomSet(10, 20, true, true));
