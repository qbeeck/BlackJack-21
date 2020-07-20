
let value = ["c1", "c2", "c4"];
let sum = 0;
let pepe = [];
value.forEach(el => pepe.push(+el.substr(1)));
console.log(pepe);
let q = pepe.forEach(element => sum += element);
console.log(q);