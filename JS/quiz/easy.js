let currentQuestionIndex = 0;
let quizData = []; // conatiner for data fra api

async function fetchQuiz() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
        if (!response.ok) {
            throw new Error('Could not connect to the API');
        }
        const data = await response.json();
        if (data.response_code === 0 && data.results) {
            quizData = data.results; // Lagrer spørsmål osm er hentet
            displayQuestion(); // Viser det første spørsmålet
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

    // tømmer container før nytt innhold legges til
    questionContainer.innerHTML = `<div class="question">${questionData.question}</div>`;

    const answers = [questionData.correct_answer, ...questionData.incorrect_answers];
    answers.sort(() => Math.random() - 0.5); // mixer svaralternativene

   
    for (let i = 0; i < answers.length; i++) { // kjører en loop som lopper gjennom svaralternativene
    const answer = answers[i]; // Lagrer det nåværende svaret i løkken i "answer"

    const button = document.createElement('button'); // adder en knapp
    button.textContent = answer; // endrer teksten på knappen til svaralternativet
    button.classList.add('answer'); // adder klasse for styiling i css

    // adder en click evenlistener til knappen.
    button.addEventListener('click', function() {
        console.log("clicked:", answer); // debug.
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



function checkAnswer(selectedAnswer) {
    console.log("selected answer:", selectedAnswer); // debug
    const correctAnswer = quizData[currentQuestionIndex].correct_answer;
    console.log("correct:", correctAnswer); // debug

    const buttons = document.querySelectorAll('.answer');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.disabled = true; // Deaktiverer alle svarknappene

        if (button.textContent === correctAnswer) {
            button.classList.add('correct'); // viser riktig svar
        } 

        // viser valgt svar som feil hvis det er feil svar
        if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('wrong');
        }
    }
}


function nextQuestion() { // neste spørsmål fubksjon
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        document.querySelector('.question-and-answer').innerHTML = '<div>result</div>';
    }
}

fetchQuiz();

