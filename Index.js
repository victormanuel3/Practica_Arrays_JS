/*  TORRES DE HANOI -------------------------*/

let div_torres = [
  document.getElementById("torre1"),
  document.getElementById("torre2"),
  document.getElementById("torre3"),
];

let torres = [[], [], []];

let colors = ["#fc333c", "#fc6a08", "#ffff0b", "#3f92ff", "#47fe3c"];

function asignarNumber() {
  let numero = parseInt(document.getElementById("number").value);

  // Validación para asegurarse de que el número esté dentro del rango permitido (1 a 5)
  if (numero < 1 || numero > 5 || isNaN(numero)) {
    alert("Por favor, ingrese un número de discos entre 1 y 5.");
    return; // Detener la ejecución si el número no es válido
  }

  torres = [[], [], []];
  torre1.innerHTML = "";

  for (let i = numero; i > 0; i--) {
    torres[0].push(i); // Llenar la primera torre con los discos en orden decreciente
  }
  updateTowers();
}

function checkVictory() {
  // Verificar que la torre 3 tenga todos los discos en orden ascendente
  let numeroDeDiscos = torres[0].length + torres[1].length;

  // Comprobar si la torre 3 contiene los discos en el orden correcto (1, 2, 3, ..., N)
  let victoria = true;
  for (let i = 0; i < numeroDeDiscos; i++) {
    if (torres[2][i] !== i + 1) {
      victoria = false;
      break;
    }
  }
  // Si la condición de victoria se cumple, muestra el mensaje
  if (victoria) {
    alert("¡Felicidades, has ganado!");
  }
}

function moveDisk(from, to) {
  let toTower = torres[to - 1];
  let fromTower = torres[from - 1];

  if (fromTower.length == 0) {
    alert("No hay discos para mover");
  } else {
    let disk = fromTower[fromTower.length - 1];

    if (toTower.length == 0 || disk < toTower[toTower.length - 1]) {
      toTower.push(fromTower.pop());
      updateTowers();
      checkVictory(); // Verificar si se ha ganado después de cada movimiento
    }
  }
}

function updateTowers() {
  let baseWidth = 50; // Ancho base para el disco más pequeño
  let widthIncrement = 40; // Incremento por cada disco más grande

  for (let i = 0; i < torres.length; i++) {
    div_torres[i].innerHTML = "";

    for (let k = torres[i].length - 1; k >= 0; k--) {
      let disco = torres[i][k];
      let width = baseWidth + (disco - 1) * widthIncrement; // Calcula el ancho del disco
      let color = colors[disco - 1]; // Asigna el color basado en el disco

      div_torres[i].innerHTML += `
                <li style="width: ${width}px; background-color: ${color}">${disco}</li>
            `;
    }
  }
}

/*BUSCAMINAS ---------------------------------- */

let filas = 8;
let columnas = 8;
let cantidadDeBombas = 10;
let tablero = [];
let celdasDescubiertas = 0;
let puntuacion = 0;

// Crear tablero
function crearTablero() {
  tablero = []; // Limpiar el tablero de cualquier valor anterior
  for (let i = 0; i < filas; i++) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(0); // Inicializar cada casilla en 0
    }
    tablero.push(fila); // Añadir la fila al tablero
  }
}

// Colocar las bombas
function colocarBombas() {
  let bombasColocadas = 0;
  while (bombasColocadas < cantidadDeBombas) {
    let filaAleatoria = Math.floor(Math.random() * filas);
    let columnaAleatoria = Math.floor(Math.random() * columnas);

    // Evitar colocar más de una bomba en la misma posición
    if (tablero[filaAleatoria][columnaAleatoria] === 0) {
      tablero[filaAleatoria][columnaAleatoria] = "x"; // Colocar la bomba
      bombasColocadas++;
    }
  }
}

// Contar las bombas adyacentes
function contarBombasAdyacentes() {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (tablero[i][j] === "x") continue; // Si es una bomba, no hacemos nada

      let contadorBombas = 0;

      // Verificar casillas adyacentes (izquierda, derecha, arriba, abajo y diagonales)
      if (i > 0 && tablero[i - 1][j] === "x") contadorBombas++; // Arriba
      if (i < filas - 1 && tablero[i + 1][j] === "x") contadorBombas++; // Abajo
      if (j > 0 && tablero[i][j - 1] === "x") contadorBombas++; // Izquierda
      if (j < columnas - 1 && tablero[i][j + 1] === "x") contadorBombas++; // Derecha
      if (i > 0 && j > 0 && tablero[i - 1][j - 1] === "x") contadorBombas++; // Arriba izquierda
      if (i > 0 && j < columnas - 1 && tablero[i - 1][j + 1] === "x")
        contadorBombas++; // Arriba derecha
      if (i < filas - 1 && j > 0 && tablero[i + 1][j - 1] === "x")
        contadorBombas++; // Abajo izquierda
      if (i < filas - 1 && j < columnas - 1 && tablero[i + 1][j + 1] === "x")
        contadorBombas++; // Abajo derecha

      tablero[i][j] = contadorBombas; // Asignar la cantidad de bombas adyacentes
    }
  }
}

// Mostrar el tablero en la página
function mostrarTablero() {
  let divJuego = document.getElementById("game");
  divJuego.innerHTML = ""; // Limpiar el tablero anterior

  let tabla = document.createElement("table");
  for (let i = 0; i < filas; i++) {
    let filaHTML = document.createElement("tr");
    for (let j = 0; j < columnas; j++) {
      let celda = document.createElement("td");
      celda.setAttribute("data-fila", i);
      celda.setAttribute("data-columna", j);
      celda.onclick = function () {
        revelarCelda(i, j);
      }; // Asignar función de clic
      filaHTML.appendChild(celda);
    }
    tabla.appendChild(filaHTML);
  }
  divJuego.appendChild(tabla);

  // Imprimir tablero en la consola
  console.table(tablero);
}

function revelarCelda(fila, columna) {
  let celda = document.querySelector(
    `td[data-fila="${fila}"][data-columna="${columna}"]`
  );

  if (celda.classList.contains("revealed")) return; // Si ya está revelada, no hacer nada
  celda.classList.add("revealed");

  // Si es una bomba, terminar el juego
  if (tablero[fila][columna] === "x") {
    celda.textContent = "💥"; // Mostrar bomba
    celda.classList.add("mine");
    revelarTodo();
    alert("¡Perdiste! Fin del juego.");
    return;
  }

  // Si la celda tiene un número, mostrar el número y sumar a la puntuación
  if (tablero[fila][columna] > 0) {
    celda.textContent = tablero[fila][columna];
    puntuacion++; // Aumentamos la puntuación por una celda normal
  }
  // Si es un 0, no mostrar ningún número pero revelar las adyacentes
  else {
    celda.textContent = "";
    revelarAdyacentes(fila, columna); // Llamamos a la función para revelar las celdas adyacentes
  }

  // Sumamos siempre a la puntuación independientemente de si es un número o un 0
  celdasDescubiertas++; // Aumentamos el contador de celdas descubiertas

  // Aquí, si es un 0, las adyacentes se revelan y se cuentan correctamente
  if (tablero[fila][columna] === 0) {
    puntuacion++; // Solo se suma 1 punto por destapar el 0 y sus adyacentes.
  }

  document.getElementById("score").textContent = puntuacion;

  // Verificar si se ha ganado
  if (celdasDescubiertas === filas * columnas - cantidadDeBombas) {
    revelarTodo();
    alert("¡Ganaste! Has descubierto todas las casillas.");
  }
}

// Cambié esta parte en la función `revelarAdyacentes` para evitar múltiples llamadas a revelarCelda
function revelarAdyacentes(fila, columna) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let nuevaFila = fila + i;
      let nuevaColumna = columna + j;

      if (
        nuevaFila >= 0 &&
        nuevaFila < filas &&
        nuevaColumna >= 0 &&
        nuevaColumna < columnas
      ) {
        let celda = document.querySelector(
          `td[data-fila="${nuevaFila}"][data-columna="${nuevaColumna}"]`
        );

        // Asegurarse de que la celda no esté revelada
        if (!celda.classList.contains("revealed")) {
          revelarCelda(nuevaFila, nuevaColumna); // Llama a revelarCelda, que ya suma puntos
        }
      }
    }
  }
}

// Revelar todo el tablero
function revelarTodo() {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let celda = document.querySelector(
        `td[data-fila="${i}"][data-columna="${j}"]`
      );
      celda.classList.add("revealed");
      if (tablero[i][j] === "x") {
        celda.textContent = "💥";
        celda.classList.add("mine");
      } else if (tablero[i][j] > 0) {
        celda.textContent = tablero[i][j];
      }
    }
  }
}

// Iniciar el juego
function startGame() {
  crearTablero();
  colocarBombas();
  contarBombasAdyacentes();
  mostrarTablero();
  puntuacion = 0;
  celdasDescubiertas = 0;
  document.getElementById("score").textContent = puntuacion;
}
