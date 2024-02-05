// variables
let round = "o";
let counter = 0;
let xScore = 0;
let oScore = 0;
let boxes = document.querySelectorAll(".xoBox");
let history=[];
// main events
boxes.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.getAttribute("xoState") == "-") {
      history.length=counter;
      if (round == "o") {
        e.setAttribute("xoState", "o");
      } else {
        e.setAttribute("xoState", "x");
      }
      let column = e.getAttribute("xoColumn");
      let row = e.getAttribute("xoRow");
      history[counter]=column+row
      if(
      checkColumn(column)||
      checkRow(row)||
      checkMainDiameter()||
      checkSupDiameter()
      ){
        wine()
        return 0;
      }
      Switch()
      counter++;
      if(counter==9){
        counter=0;
        history=[]
        document.querySelector(".winner").innerHTML="no winner";
        document.querySelector(".results").classList.add("appear");
      }
    }
  });
});

document.querySelector("button.repeat").addEventListener("click",()=>{
  document.querySelector(".results").classList.remove("appear");
  reset()
})

document.querySelector("button.back").addEventListener("click",()=>back())
document.querySelector("button.front").addEventListener("click",()=>front())

// functions
function checkColumn(column) {
  let count = 0;
  document.querySelectorAll(`[xoColumn="${column}"]`).forEach((e) => {
    if (e.getAttribute("xoState") == round) count++;
  });
  if (count == 3) return 1;
}
function checkRow(row) {
  let count = 0;
  document.querySelectorAll(`[xoRow="${row}"]`).forEach((e) => {
    if (e.getAttribute("xoState") == round) count++;
  });
  if (count == 3) return 1;
}
function checkMainDiameter() {
  let count = 0;
  boxes.forEach((e) => {
    if (
      e.getAttribute("xoColumn") == e.getAttribute("xoRow") &&
      e.getAttribute("xoState") == round
    )
      count++;
  });
  if (count == 3) return 1;
}
function checkSupDiameter() {
  let count = 0;
  boxes.forEach((e) => {
    if (
      +e.getAttribute("xoColumn") + +e.getAttribute("xoRow") == 2 &&
      e.getAttribute("xoState") == round
    )
      count++;
  });
  if (count == 3) return 1;
}

function wine() {
  counter=0;
  history=[]
  if (round == 'o'){
    oScore++;
  } 
  else{
    xScore++;
  }
  document.querySelector(".winner").innerHTML= round.toUpperCase()+" is the winner";
  document.querySelector(".oScore").innerHTML= oScore;
  document.querySelector(".xScore").innerHTML= xScore;
  document.querySelector(".results").classList.add("appear");
}

function reset() {
  boxes.forEach((e) => e.setAttribute("xoState", "-"));
}

function back(){
  if (counter>0){
    document.querySelector(`[xoColumn="${history[counter-1][0]}"][xoRow="${history[counter-1][1]}"]`).setAttribute("xoState","-")
    counter--;
    Switch()
  }
}
function front(){
  if (counter<=history.length){
    document.querySelector(`[xoColumn="${history[counter][0]}"][xoRow="${history[counter][1]}"]`).setAttribute("xoState",round)
    counter++;
    Switch()
  }
}

function Switch(){
  round = round == "x" ? "o" : "x";
  document.querySelector(".player").innerHTML=round.toUpperCase()
}