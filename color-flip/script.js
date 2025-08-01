const redButton = document.getElementById('red');
const blueButton = document.getElementById('blue');
const greenButton = document.getElementById('green');
const yourColorButton = document.getElementById('yourColor');
const resetButton = document.querySelector('#reset');

redButton.addEventListener('click', () => {
    document.body.style.backgroundColor = 'red';
});

blueButton.addEventListener('click', () => {
    document.body.style.backgroundColor = 'blue';
});

greenButton.addEventListener('click', () => {
    document.body.style.backgroundColor = 'green';
});

const colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.style.display = 'none';
document.body.appendChild(colorPicker);

yourColorButton.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker.addEventListener('input', (event) => {
    const chosenColor = event.target.value;
    document.body.style.backgroundColor = chosenColor;
});

resetButton.addEventListener('click', () => {
    document.body.style.backgroundColor = '#0e0e0e';
});