function clickButton() {
    console.log(`Hello World!`);
    const myText = document.getElementById('myText');
    const body = document.body;
    const button = document.getElementById(`modeButton`);
    const label = document.getElementById(`label`);
    const color = document.getElementById(`color`).value;
    if (button.innerHTML == `Dark Mode`) {
        button.innerHTML = `Light Mode`;
        body.style.backgroundColor = `black`;
        myText.style.color = `white`;
        label.style.color = `white`;
    } else {
        button.innerHTML = `Dark Mode`;
        body.style.backgroundColor = `lavender`;
        myText.style.color = `black`;
        label.style.color = `black`;
    }
    if (color != ``) body.style.backgroundColor = color;
}