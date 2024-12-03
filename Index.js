// Programa en HTML un sistema de control de arrays
// 1. Crea un array global de nom “llista_numeros” amb 5 valors numèrics aleatoris
// entre 1 y 10.
// Al iniciar la web mostra un div para cada valor del array:

llista_numeros = Array(5);
for (let i = 0; i < llista_numeros.length; i++) {
      llista_numeros[i] = (Math.floor(Math.random() * 10));
      console.log(llista_numeros[i]);
}

function mostraArray(){
      let div = document.getElementById("div_llista_numeros");
      llista_numeros.forEach(
      function(numero){
            div.innerHTML += "<div>"+numero+"</div>";
      });
}
mostraArray();

llista_bidimensional = new Array(
      new Array(10),
      new Array(10)
);

for (let i = 0; i < llista_bidimensional.length; i++) {
      for (let k = 0; k < llista_bidimensional[i].length;k++){
            llista_bidimensional[i][k] = Math.floor(Math.random() * 10);
      }
}

function mostraArrayBidimensional(){
      let div = document.getElementById("div_llista_numeros");
      for (let i = 0; i < llista_bidimensional.length; i++) {
            div.innerHTML += "<div>"
            for (let k = 0; k < llista_bidimensional[i].length;k++){            
                  div.innerHTML += "<div class=\"item_array\">"+llista_bidimensional[i][k]+"</div>";
            }
            div.innerHTML += "</div>"
      }
}
mostraArrayBidimensional();

// document.getElementById("btn_primer_ultim").addEventListener("onclick", ()=>{
//       // document.getElementById("resultats").innerHTML=
//       // "<ul>";
// });

/*  TORRES DE HANOI -------------------------*/

let div_torres = [
      document.getElementById("torre1"),
      document.getElementById("torre2"),
      document.getElementById("torre3")
];
  
let torres = [[],[],[]];

let colors = ["#fc333c", "#fc6a08", "#ffff0b", "#3f92ff", "#47fe3c"];

function asignarNumber() {
      let numero = parseInt(document.getElementById("number").value);
      
      torres = [[],[],[]]
      torre1.innerHTML = "";
  
      for (let i = numero; i > 0; i--) {
          torres[0].push(i);
      }
      updateTowers() 
}
  
function moveDisk(from,to) {
      let toTower = torres[to - 1];
      let fromTower = torres[from - 1];
  
      if (fromTower.length == 0){
          alert("No hay discos para mover");
      }else {
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