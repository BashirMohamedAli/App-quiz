"use strict";
const data=[
    [
        "Select the correct statement:",
        [
            "JavaScript is used only for web apps",
            "You can use JavaScript to create interactive web elements",
            "JavaScript is a server-side only language",
            "None"
        ],
        1
    ],
    
    [
        "What tag contains the JavaScript code?",
        [
            "style",
            "code",
            "script",
            "body"
        ],
        2
    ],
    [
        "How does the single line comment look like?",
        [
            "**this is a comment",
            "%%this is a comment",
            "<!--this is a comment-->",
            "//this is a comment",
        ],
        3
    ],
    [
        "Which keyword is used to tell JavaScript that we're going to work with variable",
        [
            "var",
            "variable",
            "vrb",
            "int"
        ],
        0
    ],
    [
        "What characters cannot be used in variable name?",
        [
            " Special symbols (%, #, etc.) ",
            "Letters",
            "Numbers",
            "Underscore sign"
        ],
        0
    ],
    [
        "What built-in property is used to count the number of characters in an object's property?",
        [
            "size",
            "write",
            "length",
            "width"
        ],
        2
    ],
    [
        "In order to use the object's properties within a function, use:",
        [
            "The 'var' keyword",
            "The function's name",
            "Jus the name of the property",
            "The 'this' keyword"
        ],
        3
    ],
    [
        "What is the result of trying to reference an array member which does not exit?",
        [
            "0",
            "null",
            "undefined",
            "false"
        ],
        2
    ],
    [
        "Which method is used to replace nodes?",
        [
            "replaceElements",
            "replaceNodes",
            "replace",
            "replaceChild"
        ],
        3
    ]
];
let counter=0;
let score=0;

let root;

class Task {
constructor(task) {
    this.question=task[0];
    this.answers=task[1];
    this.correct=task[2];
    this.selected=-1;
    this.render();
}
render() {
    let container=document.createElement("div");
    container.classList="task";
    container.innerHTML+=`<div class="task_question">${this.question}</div>`;
    let answerBox=document.createElement("div");
    answerBox.classList="task_answers";
    this.answers.forEach((a,i)=>{
        let btn=document.createElement("button");
        btn.classList="task_btn";
        btn.innerText=a;
        btn.onclick=()=>{
            this.selectAnswer(i);
        }
        answerBox.appendChild(btn);
    });
    container.appendChild(answerBox);
    let submitBtn=document.createElement("button");
    submitBtn.classList="task_submit";
    submitBtn.innerText="Submit";
    submitBtn.onclick=()=>{
        this.submitAnswer();
    }
    container.appendChild(submitBtn);
    render(container,root);
}
selectAnswer(idx) {
    let btn=document.getElementsByClassName("task_btn");
    for(let i=0;i<btn.length;i++) {
        if(idx==i) {
            btn[i].classList.add("task_btn_selected");
        } else {
            btn[i].classList.remove("task_btn_selected");
        }
    }
    this.selected=idx;
}
submitAnswer() {
    let isCorrect=this.selected==this.correct;
    if(isCorrect) score++;
    let msg=`<div class="task_result ${isCorrect?'task_result_correct':''}">${isCorrect?"Correct!":"Wrong!"}</div>`;
    setTimeout(()=>{
        root.innerHTML=msg;
    },800-10);
    setTimeout(()=>{
        (++counter)>=data.length?root.innerHTML=`<div class="score">You scored ${Math.round(score/data.length*100)} %</div>`:new Task(data[counter]);
    },2800-10);
    document.querySelector(".task").style.animation="test 800ms";
}
}

const render=(el,p)=>{
    p.innerHTML="";
    p.appendChild(el);
}

onload=()=>{
    root=document.getElementById("root");
    root.innerHTML=`
        <div align="center">
            <div class="title">JavaScript Quiz</div>
            <button class="start">Start</button>
        </div>
    `;    document.querySelector(".start").onclick=function() {
        new Task(data[counter]);
    }
}
