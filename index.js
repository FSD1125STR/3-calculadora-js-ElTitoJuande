function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b
}

function producto(a, b) {
    return a * b
}

function division(a, b) {
    return a / b
}

function clear() {
    pantalla.value = "0"
    primerOp = ""
    operador = ""
    esperandoSegundoOp = false
}

const pantalla = document.getElementById('pantalla');

let primerOp = "";
let operador = "";
let esperandoSegundoOp = false;

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function () {
        console.log(this.value)
        const digit = this.value

        if (esperandoSegundoOp === true) {
            pantalla.value = digit
            // pantalla.value  = "0"
            esperandoSegundoOp = false
        } else {
            if (pantalla.value === "0") {
                pantalla.value = digit
            } else {
                pantalla.value = pantalla.value + digit
            }
        }
    })
});

const botonesOp = document.querySelectorAll(".operator")

botonesOp.forEach(button => {
    button.addEventListener('click', function () {
        primerOp = Number(pantalla.value)
        console.log("primero " + primerOp)
        operador = this.textContent
        esperandoSegundoOp = true
        // esperandoSegundoOp = Number(pantalla.value)
        console.log("ope " + operador)
        console.log("wait seg " + esperandoSegundoOp)
        pantalla.value = "0"
    })
});


const igual = document.querySelector(".equals")

igual.addEventListener('click', function () {
    const segundoOp = Number(pantalla.value)
    console.log("segundo " + segundoOp)
    let resultado
    switch (operador) {
        case "+": resultado = add(primerOp, segundoOp); break;
        case "-": resultado = substract(primerOp, segundoOp); break;
        case "*": resultado = producto(primerOp, segundoOp); break;
        case "/": resultado = division(primerOp, segundoOp); break;
        default: resultado = segundoOp;
    }
    pantalla.value = resultado
    primerOp = resultado
    esperandoSegundoOp = true
})

const clearBtn = document.querySelector(".clear")

clearBtn.addEventListener("click", clear);



