window.addEventListener('load', start);

var globalNames = ['Pablo'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();

}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
    //console.log(globalNames);
  }

  //Update Names
  function upadeteName(newName) {
    globalNames[currentIndex] = newName;
    render();

  }


  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      return;
    }


    if (event.key === 'Enter') {
      if (isEditing) {
        upadeteName(event.target.value);

      } else {
        insertName(event.target.value)
      }
      isEditing = false;
      clearInput();
    }
  }

  // console.log('ENTER');
  inputName.addEventListener('keyup', handleTyping); //evento na tecla
  inputName.focus();
}


function render() {

  function createDeleteButton(index) {
    function deleteName() {
      //console.log(index);
      //console.log(deleteName);
      globalNames.splice(index, 1);
      render();
    }

    //Button
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);

    return button;
  }

  //Span - Editar Item
  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;

    span.addEventListener('click', editItem)

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  //Criar ul
  //Fazer n li's, conforme tamanho de globalNames
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');

    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);


    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}