const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');

function flipCard() {
    if (lockBoard) { return; }
    if (this === firstCard) { return; }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else {
        //second click
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    //do card match?
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        //it's a match!!
        console.log(firstCard.dataset);
        showPopup(firstCard.dataset.framework);
        disableCards();
    }
    else {
        //not a match
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');    
        secondCard.classList.remove('flip');   
        
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random()*12);
    });
})();

function showPopup(index) {
    document.getElementById('popupImg').src = places[index][0];
    document.getElementById('textH1').innerHTML = places[index][1];
    document.getElementById('textP').innerHTML = places[index][2];
    popup.classList.remove('hidden');
}

function hidePopup() {
    popup.classList.add('hidden');
}

closeButton.addEventListener('click', hidePopup);

cards.forEach(card => card.addEventListener('click', flipCard));

function addInfoToCard(card) {
    console.log(card);
    console.log(places[card.dataset.framework][0]);
    card.getElementsByClassName('front-face')[0].src = places[card.dataset.framework][0];
};

cards.forEach(card => addInfoToCard(card) );