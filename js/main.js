const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


// {
//   tag: h1,
//   attrs: {
//     class: 'title'
//   }
// }

// generate attributes tag in String, convert obj to String
const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj);
  let attrs = [];

  for(let i=0; i< keys.length; i++){
    const attr = keys[i];
    attrs.push(`${attrs} = "${obj[attr]}"`);
  }
  
  const string = attrs.slice('');

  return string;
}
// this function generate this  class="title" 

// generate tag and content
const tag = (t) => (content) => `<${t}> ${content} </${t}>`;

const description = document.querySelector('#description');
const calories = document.querySelector('#calories'); 
const carbs = document.querySelector('#carbs');
const protein = document.querySelector('#protein');

let state = [];

const validateInputs = () => {
  description.value ? '' : description.classList.add('is-invalid');
  calories.value === '' ? calories.classList.add('is-invalid') : '';
  carbs.value ? '' : carbs.classList.add('is-invalid');
  protein.value ? '' : protein.classList.add('is-invalid');

  if(description.value && calories.value && carbs.value && protein.value){
    addItem();
  }

}

const pressKeyInput = (input) => {
  input.addEventListener('keypress', () => {
    input.classList.remove('is-invalid');
  });
}

const changedInput = (input) => {
  input.addEventListener( 'change' , () => {
    input.classList.remove('is-invalid');
  });
}

const addItem = () => {
  let newItem = {
    description: description.value,
    calories: calories.value,
    carbs: carbs.value,
    protein: protein.value
  }

  state.push(newItem);
  cleanInputs();
  console.log(state);
}

const cleanInputs = () => {
  description.value = '';
  calories.value = '';
  carbs.value = '';
  protein.value = '';
}

pressKeyInput(description);
changedInput(calories);
changedInput(carbs);
changedInput(protein);

const button = document.querySelector('button');
button.addEventListener('click', validateInputs);

/**
 * DE ESTA MANERA PUEDO LLAMAR LA FUNCION ANTES O DESPUES DE HACER SU LLAMADO
 */
// function validateInputs(){
//   if(description.value === ''){
//     description.classList.add('is-invalid');
//   }
// }