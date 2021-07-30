console.log(process.env.NODE_A);
a = process.env.NODE_A.split(',').map((x) => parseInt(x));
console.log( a);
console.log(typeof a);
