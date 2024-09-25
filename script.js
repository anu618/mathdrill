let score = 0;
let timer;
let timeLeft = 10;

const options = document.querySelectorAll('.option');
const scoreElement = document.querySelector('.score');
const progressBar = document.querySelector('.progress');
const questionElement = document.querySelector('.question');

function startTimer() {
    timeLeft = 10;
    progressBar.style.width = '100%';

    timer = setInterval(() => {
        timeLeft--;
        progressBar.style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            markUnanswered();
            nextQuestion();
        }
    }, 1000);
}

function showConfetti(element) {
    const rect = element.getBoundingClientRect();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }
    });
}

function highlightWrongAnswer(element) {
    element.classList.add('wrong');
}

function markUnanswered() {
    options.forEach(button => {
        if (!button.classList.contains('correct') && !button.classList.contains('wrong')) {
            highlightWrongAnswer(button);
        }
    });
}

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 * num2;
    questionElement.textContent = `${num1} x ${num2}`;

    const correctOptionIndex = Math.floor(Math.random() * 4);
    options.forEach((button, index) => {
        if (index === correctOptionIndex) {
            button.textContent = correctAnswer;
            button.dataset.correct = true;
        } else {
            let wrongAnswer;
            do {
                wrongAnswer = Math.floor(Math.random() * 100);
            } while (wrongAnswer === correctAnswer);
            button.textContent = wrongAnswer;
            button.dataset.correct = false;
        }
    });
}

function nextQuestion() {
    options.forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
    generateQuestion();
    startTimer();
}

options.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(timer);
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
            score++;
            scoreElement.textContent = `⭐ ${score}`;
            showConfetti(button);
        } else {
            highlightWrongAnswer(button);
        }
        setTimeout(nextQuestion, 1000); // Move to the next question after a short delay
    });
});

generateQuestion();
startTimer();

// Accordion functionality
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});