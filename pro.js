var mbr = 0; // Contém a palavra a ser armazenada na memória. Também é o registrador usado para receber uma palavra lida da memória;
var mar = 0; // Memory Address Register – especifica o endereço de memória a ser lida da ou escrita na memória;
var ir = 0;  // Instruction Register – contém o opcode da instrução sendo executada;
var pc = 0;  // Program Counter – contém o endereço da próxima palavra de memória com uma instrução a ser buscada. Caso não haja nenhum desvio condicional (conditional jumps), o PC deve ser incrementado em todo ciclo de instrução;
var AC = 0;  // – Accumulator – utilizado para manter temporariamente os operandos na ALU.
var E = 0;
var L = 0;
var G = 0;

var Memory = [];

function Busca(){
  mbr = Memory[pc];
}

function decodifica(){
  //mbr = parseInt(mbr, 16).toString(2)
  mbr = ('00000000'+mbr).substring(mbr.length);
  ir = mbr[0] + mbr[1];
  mar = mbr[2] + mbr[3] + mbr[4] + mbr[5] + mbr[6] + mbr[7];
  mar = parseInt(mar, 16).toString(10);
}

function executa(){
  if (mar != 0){
  document.getElementById(mar).style.color = "#26c6da";
 }
  document.getElementById(pc).style.color = "#01579b";
  switch (ir) {
    case "00":
      return 1;
    break;
    case "01":
       AC = Memory[mar];
    break;
    case "02":
      Memory[mar] = AC;
    break;
    case "03":
      AC = AC + parseInt(Memory[mar]);
    break;
    case "04":
      AC = AC - parseInt(Memory[mar]);
    break;
    case "05":
      AC = AC * parseInt(Memory[mar]);
    break;
    case "06":
      AC = AC / parseInt(Memory[mar]);
    break;
    case "07":
      AC = AC << 1;
    break;
    case "08":
      AC = AC >> 1;
    break;
    case "09":
    E = 0;
    L = 0;
    G = 0;
      if (AC == Memory[mar]){
        E = 1;
      }
      if (AC <  Memory[mar]){
        L = 1;
      }
      if (AC >  Memory[mar]){
        G = 1;
      }
      if (AC <=  Memory[mar]){
        L = 1;
      }
      if (AC >=  Memory[mar]){
        G = 1;
      }
    break;
    case "0A":
      if (E == 1){
        pc = mar -1;
      }
    break;
    case "0B":
      if (E == 0){
        pc = mar -1;
      }
    break;
    case "0C":
      if (E == 0 && L == 1){
        pc = mar -1;
      }
    break;
    case "0D":
      if (L == 1 && E == 1){
        pc = mar -1;
      }
    break;
    case "0E":
      if (E == 0 && G == 1){
        pc = mar -1;
      }
    break;
    case "0F":
      if (E == 1 && G == 1){
        pc = mar -1;
      }
    break;
    default:

  }

   pc++;
   return 0;
}

function alterar(numb){
  Memory[numb] = document.getElementById(numb).value;
}

function create() {
  var tr = '';
  var id2 = 0;
  for (var id1 = 0; id1 < 10; id1++) {
      tr += '<tr> <td style = "font-size: 10px;  height: 10px; width: 10px; width = "50px""> '+ parseInt(id2, 10).toString(16) +'</td>';
    for (var id = 0; id < 10; id++) {
      Memory[id2] = "00000000";
      tr += '<td style ="Width = "50px""> <input style = "font-size: 10px; width = "50px""" type="text" id = "'+ id2 +'" value = "00000000" onchange = "alterar('+id2+')"></td>';
      id2++;
    }
    tr +='</tr>';
  }

    return tr;
}

function atualizar(){
  for (var i = 0; i < 100; i++) {
      document.getElementById(i).value = Memory[i];
  }
  document.getElementById("mbr").innerHTML = 'MBR: ' + mbr;
  document.getElementById("mar").innerHTML = 'Memory Address Register: ' + mar;
  document.getElementById("ir").innerHTML = 'Instruction Register: ' + ir;
  document.getElementById("pc").innerHTML = 'Program Counter: ' + pc;
  document.getElementById("AC").innerHTML = 'Accumulator: ' + AC;
  document.getElementById("E").innerHTML = 'E: ' + E;
  document.getElementById("L").innerHTML = 'L: ' + L;
  document.getElementById("G").innerHTML = 'G: ' + G;
}

function play(){
    Busca();
    decodifica();
    executa();
    atualizar();
}

window.onload = function(){
document.getElementById("myTable").innerHTML = create();
atualizar();
}
