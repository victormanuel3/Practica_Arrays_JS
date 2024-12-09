/*  TORRES DE HANOI -------------------------*/

let div_torres = [
      document.getElementById("torre1"),
      document.getElementById("torre2"),
      document.getElementById("torre3")
];

let torres = [[], [], []];

let colors = ["#fc333c", "#fc6a08", "#ffff0b", "#3f92ff", "#47fe3c"];

function asignarNumber() {
      let numero = parseInt(document.getElementById("number").value);

      torres = [[], [], []]
      torre1.innerHTML = "";

      for (let i = numero; i > 0; i--) {
            torres[0].push(i);
      }
      updateTowers()
}

function moveDisk(from, to) {
      let toTower = torres[to - 1];
      let fromTower = torres[from - 1];

      if (fromTower.length == 0) {
            alert("No hay discos para mover");
      } else {
            let disk = fromTower[fromTower.length - 1];

            if (toTower.length == 0 || disk < toTower[toTower.length - 1]) {
                  toTower.push(fromTower.pop()); //Mover el disco, lo eliminamos de from y lo pasamos a la otra torre
                  updateTowers()
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

/* BUSCAMINAS --------------------------- */

let tablero = new Array(8);
for (let i = 0; i < tablero.length; i++) {
    tablero[i] = [];
    for (let k = 0; k < tablero.length; k++) {
        tablero[i][k] = 0;
    }
}

function place_bomb() {
    let bombs = 0;

    while (bombs < 10) {
        let row = Math.floor(Math.random() * 8);
        let col = Math.floor(Math.random() * 8);
        if (tablero[row][col] === 0) {
            let bombsPerRow = tablero[row].filter(cell => cell === 'x').length;
            if (bombsPerRow < 3) {
                tablero[row][col] = 'x';
                bombs++;
            }
        }
    }
}

function count_adjacent_bombs() {
    for (let i = 0; i < tablero.length; i++) {
        for (let k = 0; k < tablero[i].length; k++) {
            if (tablero[i][k] === 'x') continue;
            let countBombs = 0;

            // Verificar celdas adyacentes
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue; // Ignorar la celda actual
                    let nx = i + dx, ny = k + dy;
                    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && tablero[nx][ny] === 'x') {
                        countBombs++;
                    }
                }
            }
            tablero[i][k] = countBombs;
        }
    }
}

function renderBoard() {
    const boardElement = document.getElementById("buscaminas");
    boardElement.innerHTML = ""; // Limpiar el tablero

    for (let i = 0; i < tablero.length; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";

        for (let k = 0; k < tablero[i].length; k++) {
            let cell = document.createElement("button");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.margin = "2px";
            cell.dataset.row = i;
            cell.dataset.col = k;
            cell.onclick = handleCellClick;
            cell.innerText = ""; // Inicialmente vacío
            rowDiv.appendChild(cell);
        }

        boardElement.appendChild(rowDiv);
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const cellValue = tablero[row][col];

    if (cellValue === 'x') {
        alert("¡Boom! Has encontrado una mina. Juego terminado.");
        revealBoard();
    } else {
        revealCell(row, col);
        checkWin();
    }
}

function revealCell(row, col) {
    const cells = document.querySelectorAll("button");
    const cell = Array.from(cells).find(c => c.dataset.row == row && c.dataset.col == col);

    if (cell && cell.innerText === "") {
        cell.innerText = tablero[row][col];
        cell.disabled = true;
        if (tablero[row][col] === 0) {
            // Revelar celdas conexas
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    let nx = row + dx, ny = col + dy;
                    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                        revealCell(nx, ny);
                    }
                }
            }
        }
    }
}

function revealBoard() {
    const cells = document.querySelectorAll("button");
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        cell.innerText = tablero[row][col];
        cell.disabled = true;
    });
}

function checkWin() {
    const cells = document.querySelectorAll("button");
    const hiddenCells = Array.from(cells).filter(cell => cell.innerText === "");
    const nonMineCells = hiddenCells.filter(cell => tablero[cell.dataset.row][cell.dataset.col] !== 'x');

    if (nonMineCells.length === 0) {
        alert("¡Felicidades! Has ganado el juego.");
        revealBoard();
    }
}

// Inicializar el tablero
place_bomb();
count_adjacent_bombs();
renderBoard();

console.log(tablero); // Mostrar las minas en la consola

/*----------------------------------------*/