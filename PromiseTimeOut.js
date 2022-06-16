// also try timely print numbers

setTimeout(() => {
  new Promise((resolve) => {
    resolve();
    console.log(6);
  }).then(() => {
    console.log(4);
  });
  console.log(7);
});

new Promise((resolve) => {
  resolve();
  console.log(3);
}).then(() => {
  setTimeout(() => {
    console.log(5);
  });
  console.log(1);
});

console.log(2);

console.log("------");

let printMax = (max) => {
  let i = 0;
  setInterval(function () {
    console.log(++i);
    if (i === max) clearTimeout(this);
  }, 1000);
};

printMax(10);
