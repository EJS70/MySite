function clickButton() {
    console.log(`Hello World!`);
    const myText = document.getElementById('myText');
    const body = document.body;
    const button = document.getElementById(`modeButton`)
    if (button.innerHTML == `Dark Mode`) {
        button.innerHTML = `Light Mode`;
        body.style.backgroundColor = `black`;
        myText.style.color = `white`;
    } else {
        button.innerHTML = `Dark Mode`;
        body.style.backgroundColor = `lavender`;
        myText.style.color = `black`;
    }
}