const popupTriggerBtn = document.getElementById('popup-trigger');
const btnClose = document.getElementById('overlay-close');
const form = document.querySelector('.signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function initialValue() {
  username.value = '';
  email.value = '';
  password.value = '';
  password2.value = '';
}

initialValue();

// add/remove overlay
function toggleOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.toggle('open');
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}


function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function isValidEmail(input) {
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailPattern.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}



function requiredInput(inputs) {
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      const capitalized = input.id.replace(input.id.charAt(0), input.id.charAt(0).toUpperCase());
      showError(input, `${capitalized} is required`);
    } else {
      showSuccess(input);
    }   
  })
}


function checkPasswords(input, input2) {
  if(input.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } 
}


function checkLength(input, min, max) {
  const capitalized = input.id.replace(input.id.charAt(0), input.id.charAt(0).toUpperCase());
  if(input.value.length < min) {
    showError(input, `${capitalized} must be at least ${min} characters`);
  }
  if(input.value.length > max) {
    showError(input, `${capitalized} must be no longer than ${max} characters`);
  }
}


function showModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'grid';
}

popupTriggerBtn.addEventListener('click', toggleOverlay);
btnClose.addEventListener('click', toggleOverlay);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  requiredInput([username, email, password, password2]);
  isValidEmail(email);
  checkPasswords(password, password2);
  checkLength(username, 3, 20);
  checkLength(password, 6, 25);
});