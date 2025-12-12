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


const pantalla = document.getElementById('pantalla');
const historial = document.getElementById('historial');


let primerOp = "";
let operador = "";
let esperandoSegundoOp = false;

const number = document.querySelectorAll('.number')
number.forEach(button => {
    button.addEventListener('click', function () {
        handleNumber(this.value);
    })
});

function handleNumber(digit) {
    if (pantalla.value === "Error") {
        pantalla.value = "0";
    }

    if (esperandoSegundoOp === true) {
        pantalla.value = digit;
        esperandoSegundoOp = false;
        return;
    }

    if (pantalla.value === "0") {
        pantalla.value = digit;
    } else {
        pantalla.value = pantalla.value + digit;
    }
}

const operatorBtn = document.querySelectorAll(".operator")

operatorBtn.forEach(button => {
    button.addEventListener('click', function () {
        handleOperator(this.textContent)
    })
});

function handleOperator(op) {
    if (pantalla.value === "Error") return;
    primerOp = Number(pantalla.value)
    // console.log("primero " + primerOp)
    operador = op
    esperandoSegundoOp = true
    // esperandoSegundoOp = Number(pantalla.value)
    // console.log("ope " + operador)
    // console.log("wait seg " + esperandoSegundoOp)
    pantalla.value = ""
    
  historial.textContent = `${primerOp} ${operador}`;
}


const igual = document.querySelector(".equals")

igual.addEventListener('click', handleEqual)

function handleEqual() {
    if (pantalla.value === "Error") return;

    const segundoOp = Number(pantalla.value);
    const primerOriginal = primerOp;

    let resultado;
    switch (operador) {
        case "+":
            resultado = add(primerOp, segundoOp);
            break;
        case "-":
            resultado = substract(primerOp, segundoOp);
            break;
        case "*":
            resultado = producto(primerOp, segundoOp);
            break;
        case "/":
            resultado = division(primerOp, segundoOp);
            break;
        default:
            resultado = segundoOp;
    }

    const textoResultado = formatResult(resultado);
    pantalla.value = textoResultado;

    if (textoResultado === "Error") {
        historial.textContent = `${primerOriginal} ${operador} ${segundoOp} = Error`;
        primerOp = 0;
        operador = "";
        esperandoSegundoOp = true;
        return;
    }

    historial.textContent = `${primerOriginal} ${operador} ${segundoOp} =`;
    primerOp = Number(textoResultado);
    esperandoSegundoOp = true;
}

const clearBtn = document.querySelector(".clear")

clearBtn.addEventListener("click", handleClear);

function handleClear() {
    pantalla.value = "0";
    primerOp = "";
    operador = "";
    esperandoSegundoOp = false;
    historial.textContent = "";
}

const decimal = document.querySelector(".decimal")

decimal.addEventListener("click", handleDecimal)

function handleDecimal() {
    if (pantalla.value === "Error") {
        pantalla.value = "0";
    }

    if (esperandoSegundoOp === true) {
        pantalla.value = "0.";
        esperandoSegundoOp = false;
        return;
    }

    if (pantalla.value.includes(".")) return;

    if (pantalla.value === "0") {
        pantalla.value = "0.";
    } else {
        pantalla.value += ".";
    }
}

const signoBtn = document.querySelector(".signo")

signoBtn.addEventListener("click", handleSigno)

function handleSigno() {
    if (pantalla.value === "Error") return;

    let valorActual = Number(pantalla.value);
    if (isNaN(valorActual)) return;

    valorActual *= -1;
    pantalla.value = formatResult(valorActual);
}

const deleteBtn = document.querySelector(".delete")

deleteBtn.addEventListener("click", handleDelete)

function handleDelete() {
    if (pantalla.value === "Error") {
        pantalla.value = "0";
        return;
    }

    let valor = pantalla.value;

    if (valor.length === 1) {
        pantalla.value = "0";
        return;
    }

    valor = valor.slice(0, -1);

    if (valor === "" || valor === "-") {
        valor = "0";
    }

    pantalla.value = valor;
}

const sqrtBtn = document.querySelector(".sqrt")

sqrtBtn.addEventListener("click", function () {
    handleSqrt()
})

function handleSqrt() {
    if (pantalla.value === "Error") return;

    const valor = Number(pantalla.value);
    if (isNaN(valor)) return;

    if (valor < 0) {
        pantalla.value = "Error";
        historial.textContent = `√(${valor}) no real`;
        esperandoSegundoOp = true;
        return;
    }

    const textoResultado = formatResult(Math.sqrt(valor));

    if (textoResultado === "Error") {
        pantalla.value = "Error";
        historial.textContent = `√(${valor}) = Error`;
        esperandoSegundoOp = true;
        return;
    }

    pantalla.value = textoResultado;
    historial.textContent = `√(${valor}) =`;
    primerOp = Number(textoResultado);
    esperandoSegundoOp = true;
}

function formatResult(value) {

    if (!Number.isFinite(value)) {
        return "Error";
    }

    const rounded = Number(value.toFixed(10));

    if (Number.isInteger(rounded)) {
        return String(rounded);
    }

    return rounded.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

document.addEventListener("keydown", (e) => {
  const k = e.key;

  if (k === "Enter" || k === "Backspace") e.preventDefault();

  if (k >= "0" && k <= "9") {
    handleNumber(k);
    return;
  }

  if (k === "+" || k === "-" || k === "*" || k === "/") {
    handleOperator(k);
    return;
  }

  if (k === "Enter" || k === "=") {
    handleEqual();
    return;
  }

  if (k === "." || k === ",") {
    handleDecimal();
    return;
  }

  if (k === "Backspace") {
    handleDelete();
    return;
  }

  if (k === "Escape") {
    handleClear();
    return;
  }

  if (k === "r" || k === "R" ) {
    handleSqrt();
    return;
  }

  if (k === "F9") {
    handleSigno(); 
    return;
  }
});
