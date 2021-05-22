// All questions and answers options

const questions = [
    {
        question: 'Most Popular Programming Languages For 2021?',
        options: [
            'JavaScript',
            'Python',
            'Java',
            'C#',
        ],
        rightAnswer: 0

    },
    {
        question: 'Who 45th president of the United States?',
        options: [
            'Thomas Woodrow Wilson',
            'William Jefferson Clinton',
            'Barack Hussein Obama II',
            'Donald John Trump',
        ],
        rightAnswer: 3

    },
    {
        question: 'What country makes BMWs?',
        options: [
            'Japan',
            'Ukraine',
            'United States',
            'Germany',
        ],
        rightAnswer: 3

    },
    {
        question: 'How much will it be if 2 * 2 + 4 = ?',
        options: [
            '9',
            '12',
            '8',
            '7',
        ],
        rightAnswer: 2

    }


];

const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

// All our options
const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question");
const numberOfQuestion = document.getElementById("number-of-question");
const numberOfAllQuestion = document.getElementById("number-of-all-questions");

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");



const correctAnswer = document.getElementById("correct-answer");
const numberOfAllQuestion2 = document.getElementById("number-of-all-questions-2");
const btnTryAgain = document.getElementById("btn-try-again");

let indexOfQuestion; // Index of the current question
let indexOfPage = 0; // Page index
let score = 0; // The final result of the quiz


numberOfAllQuestion.innerHTML = questions.length // Number of all questions

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //question

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // Setting the current page number
    indexOfPage++; // increasing the page index
};


let completedAnswers = [];


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load(); 
            }
        };
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    } else {
        el.target.classList.add("wrong");
        updateAnswerTracker("wrong");
    };
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add("disabled");
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add("correct");
        } 
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove("disabled", "correct", "wrong");
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement("div");
        answersTracker.appendChild(div);

    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
};

const validate = () => {
    if (!optionElements[0].classList.contains("disabled")) {
        alert("Just make your choice from the options presented")
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener("click", validate);


for (option of optionElements) {
    option.addEventListener("click", e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector(".quiz-over-modal").classList.add("active");
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);



window.addEventListener('load', () => {
    randomQuestion();
    answerTracker(); 
})