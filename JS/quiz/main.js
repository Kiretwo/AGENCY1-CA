async function fetchQuiz() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        if (!response.ok) {
            throw new Error('Could not connect to the API');
        }
        const data = await response.json();
        console.log(data, "is received");
        
        // respons?
        if(data.response_code === 0 && data.results) {
            return data.results; 
        } else {
            console.warn('No results found');
            return []; // returnerer tomt array hvis ingen resultat fra fetch
        }
        
    } catch (error) {
        console.error("Could not get quiz data:", error);
        return []; // returnerer tomt array hvis feil
    }
}


fetchQuiz().then(quizData => {
    console.log('Quiz data:', quizData); // Handle the quiz data
});
