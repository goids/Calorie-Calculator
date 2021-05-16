const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


const description = document.querySelector('#description');
const calores = document.querySelector('#calores'); 
const carbs = document.querySelector('#carbs');
const protein = document.querySelector('#protein');