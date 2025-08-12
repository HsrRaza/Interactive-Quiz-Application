const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            { text: "shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Girafee", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobhi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent  in the world",
        answers: [
            { text: "Asia", correct: false },
            { text: "Austallia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
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