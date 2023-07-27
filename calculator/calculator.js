let a = document.getElementById(`a`);
let b = document.getElementById(`b`);
let result = document.getElementById(`result`);
let history = document.getElementById(`history`);
function add() {
     result.innerHTML = parseFloat(a.value) + parseFloat(b.value);
    history.innerHTML += parseFloat(a.value) + " + " + parseFloat(b.value) + " = " +  result.innerHTML + "<br/>";
}
function sub() {
     result.innerHTML = a.value - b.value;
     history.innerHTML += parseFloat(a.value) + " - " + parseFloat(b.value) + " = " +  result.innerHTML + "<br/>";

}
function mul() {
     result.innerHTML = a.value * b.value;
     history.innerHTML += parseFloat(a.value) + " * " + parseFloat(b.value) + " = " +  result.innerHTML + "<br/>";

}

function div() {
     result.innerHTML = a.value / b.value;
     history.innerHTML += parseFloat(a.value) + " / " + parseFloat(b.value) + " = " +  result.innerHTML + "<br/>";

}

function mod() {
     result.innerHTML = a.value % b.value;
     history.innerHTML += parseFloat(a.value) + " % " + parseFloat(b.value) + " = " +  result.innerHTML + "<br/>";

}

