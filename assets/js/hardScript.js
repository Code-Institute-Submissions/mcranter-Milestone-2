//Code created using tutorial by FreeCodeCamp (cited in Readme)
/*global document, overlay, setTimeout, alert, window */
/*eslint no-undef: "error"*/

const cards = document.querySelectorAll('.card');

//Modal controls - Code created using tutorial by Web Dev Simplified (cited in Readme)
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

//closes modal by clicking outside it 
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click',() => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

//open modal
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

//close modal
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//All of following Code was created using tutorial by FreeCodeCamp (cited in Readme) unless stated otherwise
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//determines if card flipped is the first or second card
function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //second click
    secondCard = this; 

    checkForMatch();
}

//ternary operator used check if cards match
function checkForMatch () {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCards() : unflipCards();
}

//disables flipping in the event of a match by removing flip class
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); 

    resetBoard();
}

//unflips cards if there's no match 
function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');    
        resetBoard();
    },  1500);
}

//resets the board
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// IIFE (Immediately-invoked Function Expression) used to shuffle board upon game start
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

//Fixes flip function (written by me)
document.querySelector('.memory-game').addEventListener('click', function (e) {
	const parentElement = e.target.parentElement;
	if (parentElement.classList.contains('card')) {
		flipCard.call(parentElement);
	}
});

//written by me 
//quit modal
function sure() { // eslint-disable-line no-unused-vars
  alert("Sure you want to quit?");
  window.location.href = 'index.html';
}