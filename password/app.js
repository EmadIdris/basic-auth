'use strict';

const base64 = require('base-64'); // used to encode data to base 64 data
const bcrypt = require('bcrypt'); // used to hash data

console.log('\n------------------ Base64 -----------------\n');

let string = 'emad:pizza';

const encoded = base64.encode(string);
console.log('Encoded String: ', encoded);

const decoded = base64.decode(encoded);
console.log('Decoded String: ', decoded);

console.log('\n------------------ Hashing -----------------\n');


let password = decoded.split(":")[1]; // pizza
const complexity = 5; // the # of times we want to hash the password // Salt

encrypt(password, complexity);

async function encrypt(password, complexity) {

  const hashed = await bcrypt.hash(password, complexity);
  console.log('hashed: ', hashed);

  // set of hashed values

  // this will be the stored version in the DB
  // this is the first time we encrypted the password and we will be using to check if the password
  const storedHashedPizza = '$2b$05$fji/k8AeudEtLsa4ntOZl.bkVTqc69hDyiF6RHAHJlgjRtGKvjDsi'; // hash of pizza

  // the compare function will hash the plain password using the same salt that was used with the stored hashed Value
  const isHashedPizzaValid = await bcrypt.compare(password, storedHashedPizza);
  const hashIsAlwayValid = await bcrypt.compare(password, hashed);

  console.log('valid pizza? ', isHashedPizzaValid);
  console.log('valid cat? ', hashIsAlwayValid);
  console.log('password: ', password);

}