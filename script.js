// Determine current page
const currentPage = window.location.pathname.split('/').pop();

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

if (currentPage === 'index.html') {
    const startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", () => window.location.href = 'quiz.html');
} else if (currentPage === 'quiz.html') {
    // DOM Elements for quiz
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const currentQuestionSpan = document.getElementById("current-question");
    const totalQuestionsSpan = document.getElementById("total-questions");
    const scoreSpan = document.getElementById("score");
    const progressBar = document.getElementById("progress");

    // QUIZ STATE VARS
    let currentQuestionIndex = 0;
    let score = 0;
    let answersDisabled = false;

    totalQuestionsSpan.textContent = quizQuestions.length;

    // Initialize quiz
    startQuiz();

    function startQuiz() {
        // reset vars
        currentQuestionIndex = 0;
        score = 0;
        scoreSpan.textContent = 0;
        showQuestion();
    }

    function showQuestion() {
        // reset state
        answersDisabled = false;

        const currentQuestion = quizQuestions[currentQuestionIndex];

        currentQuestionSpan.textContent = currentQuestionIndex + 1;

        const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
        progressBar.style.width = progressPercent + "%";

        questionText.textContent = currentQuestion.question;

        answersContainer.innerHTML = "";

        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("answer-btn");

            button.dataset.correct = answer.correct;

            button.addEventListener("click", selectAnswer);

            answersContainer.appendChild(button);
        });
    }

    function selectAnswer(event) {
        if (answersDisabled) return;

        answersDisabled = true;

        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        Array.from(answersContainer.children).forEach((button) => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            } else if (button === selectedButton) {
                button.classList.add("incorrect");
            }
        });

        if (isCorrect) {
            score++;
            scoreSpan.textContent = score;
        }

        setTimeout(() => {
            currentQuestionIndex++;

            if (currentQuestionIndex < quizQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    function showResults() {
        localStorage.setItem('quizScore', score);
        window.location.href = 'result.html';
    }
} else if (currentPage === 'result.html') {
    // DOM Elements for result
    const finalScoreSpan = document.getElementById("final-score");
    const maxScoreSpan = document.getElementById("max-score");
    const resultMessage = document.getElementById("result-message");
    const restartButton = document.getElementById("restart-btn");

    const score = parseInt(localStorage.getItem('quizScore')) || 0;
    const total = quizQuestions.length;

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = total;

    const percentage = (score / total) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }

    restartButton.addEventListener("click", () => window.location.href = 'index.html');
}