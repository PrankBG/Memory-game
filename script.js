const cards = document.querySelectorAll('.memory-card');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');
const categories = document.querySelectorAll('.category');
let info = [
    [],
    []
];
const category =  new URL(window.location.href).searchParams.get('category');




let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
        showPopup(firstCard.dataset.framework);
        disableCards();
    }
    else {
        //not a match
        unflipCards();
    }
}

function disableCards() {
    //makes the matched fliped card unclickable
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    //if the flipped card doen not match waits a little bit and turns them back
    setTimeout(() => {
        firstCard.classList.remove('flip');    
        secondCard.classList.remove('flip');   
        
        resetBoard();
    }, 1500);
}

function resetBoard() {
    //after the flipped cards are decided they match or not, and are unfliped, reset the variables used to check if cards match
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    //shffles the cards on the board
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random()*12);
    });
})();

function showPopup(index) {
    //shows the popup window and fill the information about the photo on the flipped cards
    document.getElementById('popupImg').src = info[index][0];
    document.getElementById('textH1').innerHTML = info[index][1];
    document.getElementById('textP').innerHTML = info[index][2];
    popup.classList.remove('hidden');
}

function hidePopup() {
    //hides the popup window
    popup.classList.add('hidden');
}

function addInfoToCard(card) {
    //puts the photos into the cards
    card.getElementsByClassName('front-face')[0].src = info[card.dataset.framework][0];
};

function chooseCategory(category) {
    //when a category have been choosen opens the game with said category as the information source
    window.open('game.html?category='+category, '_self');
}

(function pickCategory() {
    //puts the source of information for the choosen category into the array used to read information
    if (category == 0) {
        info = places;
    }
    else if (category == 1) {
        info = people;
    }
})();



cards.forEach(card => addInfoToCard(card)); //for every card call the function to put photon in to the card
cards.forEach(card => card.addEventListener('click', flipCard));//makes all cards clickable
closeButton.addEventListener('click', hidePopup); //makes the close button clickable, and when click call the function hidePopup