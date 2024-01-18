/* eslint-disable no-unused-vars */
const btnEl = document.getElementById('purple-btn');
const inputEl = document.getElementById('name');

function submitForm(event) {
  event.preventDefault();
  const name = inputEl.value;
  if (name) {
    const difficulty = document.querySelector('input[name="difficulty"]:checked');
    sessionStorage.setItem('USER', name);
    sessionStorage.setItem('DIFFICULTY', difficulty.value);
    window.location.href = 'game.html';
  } else {
    inputEl.style.backgroundColor = "#f5dadf";
    inputEl.placeholder = "Введите ваше имя";
  }
}

btnEl.addEventListener('click', submitForm);
