let gameSeq=[];
let userSeq=[];

let btns=["red","green","orange","blue"];

let started = false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}
  
function levelUp(){
    userSeq =[];
    level++;
    h2.innerText=`Level ${level}`;

    let randomIdx= Math.floor(Math.random()*3);
    let randColor= btns[randomIdx];
    let randbtn= document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

let ScoreArr=[];
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
        
    }
    else{
        ScoreArr.push(level);
        let HighestScore= ScoreArr[0];
        for(let i=0; i<ScoreArr.length; i++){
            if(ScoreArr[i]>HighestScore){
                HighestScore = ScoreArr[i]
            }
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> Highest Score is <b>${HighestScore}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn= this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    

    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
