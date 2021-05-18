const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


// {
//   tag: h1,
//   attrs: {
//     class: 'title'
//   }
// }


const attrsToString = (obj = {}) => {
    const keys = Object.keys(obj);
    let attrs = [];

    for(let i=0; i<keys.length; i++){
      const attr = keys[i];
      attrs.push(`${attr}="${obj[attr]}"`);
    }

    const string = attrs.join('');

    return string;
}

const attrsTag = (obj) => (content = "") => `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}> ${content} </${obj.tag}>`

const tag = (t) => {
  if(typeof t === 'string'){
    return attrsTag({tag: t})
  }else{
    return attrsTag(t)
  }
}

// generate Rows
const tableRow = tag('tr');
// const tableRows = items => tableRow(tableCells(items)), first way for generated rows
const tableRows = items => compose(tableRow, tableCells)(items);

// Generate Cells
const tableCell = tag('td');
const tableCells = items => items.map(tableCell).join('');

const trashIcon = tag({ tag: 'i', attrs: { class: 'fas fa-trash-alt'}})('');

let description = document.querySelector('#description');
let calories = document.querySelector('#calories'); 
let carbs = document.querySelector('#carbs');
let protein = document.querySelector('#protein');

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
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value)
  }

  state.push(newItem);
  updateTotal();
  cleanInputs();
  console.log(state);
  render();
}

const updateTotal = () => {
  let calories = 0, carbs= 0, protein = 0;

  state.map( item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  });

  document.querySelector('#totalCalories').textContent = calories;
  document.querySelector('#totalCarbs').textContent = carbs;
  document.querySelector('#totalProtein').textContent = protein;
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



const render = () => {
  document.querySelector('tbody').textContent = '';

  const allItems = state.map( (item, index) => {
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon);
    
    return tableRows([item.description, item.calories, item.carbs, item.protein, removeButton]);
  })

  document.querySelector('tbody').innerHTML += allItems.join(''); 
}

const removeItem = (index) => {
  state.splice(index, 1);
  updateTotal();
  render();
}

/**
 * DE ESTA MANERA PUEDO LLAMAR LA FUNCION ANTES O DESPUES DE HACER SU LLAMADO
 */
// function validateInputs(){
//   if(description.value === ''){
//     description.classList.add('is-invalid');
//   }
// }