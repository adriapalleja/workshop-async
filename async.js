// log the `rnd` result in the console using all three async techniques.
// You can only call console.log inside the `main` function.

const randomNumber = () => {
  return Math.random();
}

// 1. Make it wait for 1 sec. with `setTimeout` and log it on main function
const timeoutRandomNumber = (cb) => {
  setTimeout(() => {
    try {
      cb(null,randomNumber());
    } catch (err) {
      cb(err);
    }
  },1000);
}

// 2. Now wrap the timeout version to work with promises
const promiseRandomNumber = () => {
  return new Promise(function(resolve,reject) { 
    timeoutRandomNumber((err,num) => {
      if (err) reject(err);
      else resolve(num);
    })
  });
}

// 3. Finally, code a final version with async await.
const asyncRandomNumber = async () => {
  return await promiseRandomNumber();
}

const rangedRandomNumber = (base, min, max) => {
  return Math.floor((base * (max - min)) + min);
}

const main = () => {
  const rnd = randomNumber();
  console.log('Random ',rangedRandomNumber(rnd, 14, 42));

  // log rnd…
  timeoutRandomNumber((err,rnd)=>{
    if (err) throw err;
    else console.log('Callback ',rangedRandomNumber(rnd, 14, 42));
  });
  promiseRandomNumber()
    .then(rnd => console.log('Promise ',rangedRandomNumber(rnd, 14, 42)))
    .catch(err => console.log(err));
  asyncRandomNumber()
    .then(rnd => console.log('Async ',rangedRandomNumber(rnd, 14, 42)))
    .catch(err => console.log(err));
}

main();

module.exports = main;