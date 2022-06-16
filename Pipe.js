var add1 = (x) => x + 1;
var mul2 = (x) => x * 2;
var div4 = (x) => x / 4;

console.log(pipe(add1, mul2, div4)(3)); // = 2
console.log(pipe(mul2, add1, div4)(3)); // = 1.75
console.log(pipe(mul2, div4, add1)(3)); // = 2.5
console.log(pipe(mul2, div4, add1, mul2)(3)); // = 5

function pipe() {
  return (num) => {
    for (let i = 0; i < arguments.length; i++) {
      num = arguments[i](num);
    }
    return num;
  };
}
