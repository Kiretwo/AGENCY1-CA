fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
  .then(response => response.json())
  .then(data => console.log(data));

const deckId = 'ruv6g0csc79h'; // replace with actual deck ID
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    .then(response => response.json())
    .then(data => console.log(data));

document.getElementById("cardDrawn").innerHTML = data;

