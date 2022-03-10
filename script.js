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
        disableCards();
        showPopup();
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

function showPopup() {
    popup.classList.remove('hidden');
}

function hidePopup() {
    popup.classList.add('hidden');
}

closeButton.addEventListener('click', hidePopup);

cards.forEach(card => card.addEventListener('click', flipCard));