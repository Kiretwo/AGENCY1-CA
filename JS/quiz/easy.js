let currentQuestionIndex = 0;
let quizData = []; // conatiner for data fra ap
let quizStartTime; //variabel fro start tid
let timerInterval; //variabel for å lagre timer intervaler


async function fetchQuiz() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
        if (!response.ok) {
            throw new Error('Could not connect to the API');
        }
        const data = await response.json();
        // console.log(data) 
        if (data.response_code === 0 && data.results) {
            quizData = data.results; // Lagrer spørsmål osm er hentet
            displayQuestion(); // Viser det første spørsmålet
            startTimer(); //starter timer funksjon
        } else {
            console.log('No results found');
            return [];
        }
    } catch (error) {
        console.log("Could not get quiz data:", error);
        return []; // returnerer tomt array hvis feil
    }
}

function displayQuestion() {
    const questionContainer = document.querySelector('.question-and-answer');
    const questionData = quizData[currentQuestionIndex];

    const progress = document.querySelector('.progress'); 
    progress.innerHTML = "Question " + (currentQuestionIndex + 1) + " out of " + quizData.length; // viser progress underveis baseert på lengden av arrayet

    // tømmer container før nytt innhold legges til
    questionContainer.innerHTML = `<div class="question">${questionData.question}</div>`;

    const answers = [questionData.correct_answer, ...questionData.incorrect_answers];
    answers.sort(() => Math.random() - 0.5); // mixer svaralternativene

   
    for (let i = 0; i < answers.length; i++) { // kjører en loop som lopper gjennom svaralternativene
    const answer = answers[i]; // Lagrer det nåværende svaret i løkken i "answer"
    const button = document.createElement('button'); // adder en knapp
    button.innerHTML = answer; // endrer teksten på knappen til svaralternativet
    button.classList.add('answer'); // adder klasse for styiling i css

    // adder en click evenlistener til knappen.
    button.addEventListener('click', function() {
        // console.log("clicked:", answer); // debug.
        checkAnswer(answer); // kjører checkAnswer funksjon med valgt svar som argument.
    });

    questionContainer.appendChild(button); // Legger knappen til questionContainer
    }

    // neste spørsmål knapp
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next Question';
    nextButton.id = 'next-question';
    nextButton.addEventListener('click', nextQuestion);
    questionContainer.appendChild(nextButton);
}


function decodeHTML(html) {//på grunn av problemer med parsing måtte jeg lage en decoder som gjør det smame som html gjør.
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function checkAnswer(selectedAnswer) {//legger til valgt svar i quizData array for dette spørsmålet
    quizData[currentQuestionIndex].user_answer = selectedAnswer;  
    const correctAnswer = quizData[currentQuestionIndex].correct_answer;
    const buttons = document.querySelectorAll('.answer');

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.disabled = true; // Deaktiverer alle svarknappene

        // console.log({html: button.innerHTML, api: correctAnswer}); //debug
        if (button.innerHTML === decodeHTML(correctAnswer)) {
            button.classList.add('correct'); // viser riktig svar
        }

        // viser valgt svar som feil hvis det er feil svar
        if (button.textContent === decodeHTML(selectedAnswer) && decodeHTML(selectedAnswer) !== decodeHTML(correctAnswer)) {
            button.classList.add('wrong');
        }
    }
}


function nextQuestion() { // neste spørsmål fubksjon
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    quizStartTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000); //oppdaterer timeren hvert sekund
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - quizStartTime) / 1000); //kalkumerer tid brukt i sekunder
    const timerDisplay = document.querySelector('.timer');
    if (timerDisplay) {
        timerDisplay.textContent = `Time: ${elapsedTime} seconds`;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0; //resetter index
    quizData = []; // klarer quizData array
    clearInterval(timerInterval); // stopper tiden
    fetchQuiz(); // fetcher quiz på nytt
}

function endQuiz() {
    clearInterval(timerInterval);
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - quizStartTime) / 1000);

    // regner antall riktig svar basert på user answer lagret i hvert spørsmål
    const correctAnswers = quizData.reduce((count, question) => {
        return count + (question.user_answer === question.correct_answer ? 1 : 0);
    }, 0);


    const quizResultEasy = { //lager en const med rsultat for quiz som videre lagres i local storage
        correctAnswers: correctAnswers, totalQuestions: quizData.length, timeSpent: elapsedTime, date: new Date().toLocaleString() 
    };

    localStorage.setItem('quizResultEasy', JSON.stringify(quizResultEasy));

    const previousResult = JSON.parse(localStorage.getItem('quizResultEasy'));

    const resultContainer = document.querySelector('.question-and-answer');
    resultContainer.innerHTML = `<div>gratz! you are finsihed</div>
                                 <div>${correctAnswers} of ${quizData.length} correct answers</div>
                                 <div>You used: ${elapsedTime} seconds</div>
                                 <button id="restart-button">Restart Quiz</button>
                                 <div class="previous-results">
                                    <h3>Previous result on easy</h3>
                                    <div>Last result: ${previousResult.correctAnswers} of ${previousResult.totalQuestions} correct answers, time used ${previousResult.timeSpent} secounds on ${previousResult.date}
                                    </div>
                                </div>`

    document.getElementById('restart-button').addEventListener('click', restartQuiz);
                                 
}

fetchQuiz();


