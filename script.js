const questions = [
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/*", correct: false },
            { text: "<!--", correct: false },
            { text: "#", correct: false },
        ]
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "var myVar;", correct: false },
            { text: "let myVar;", correct: false },
            { text: "const myVar;", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which method is used to print output in the console?",
        answers: [
            { text: "print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "log.print()", correct: false },
            { text: "output()", correct: false },
        ]
    },
    {
        question: "Which data type is NOT supported in JavaScript?",
        answers: [
            { text: "Number", correct: false },
            { text: "String", correct: false },
            { text: "Character", correct: true },
            { text: "Boolean", correct: false },
        ]
    },
    {
        question: "What is the output of: console.log(typeof null)?",
        answers: [
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "object", correct: true },
            { text: "string", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;


// it resets everything and show the first question , 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0
    nextButton.textContent = "Next";
    showQuestion();
}


// starts rendering current questions and options buttons 
function showQuestion() {

    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button)
    })
}

//clear the previous answers before showing a new questions

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML=""
}

// handle answer choice, mark correct / incorrect, update score
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";


    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }

    [...answerButtons.children].forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


// display final results and give play-again options
function showScore(){
    resetState();
    questionElement.textContent=`You Scored ${score} out of ${questions.length}!`
    nextButton.textContent = "play Again";
    nextButton.style.display="Block"
}

// next questions or show the final score 

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz()  // restaring the quiz by clicking on play Again


    }
})

startQuiz()