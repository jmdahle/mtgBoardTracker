
const apiBaseUrl = 'https://api.scryfall.com/cards/search?q=';

// Global variables
let cards = []; // array for card objects
let castCards = []; // array for card objects that have been played
let removedCards = []; // array for cards that are removed from play


// Page references
const searchBtn = document.getElementById('searchBtn');
const searchText = document.getElementById('cardNameSearchText');
const cardSearchReturnDiv = document.getElementById('cardSearchReturn');
const cardsOnBoardDiv = document.getElementById('cardsOnBoard');

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let searchName = searchText.value;
    console.log('searching database for ' + searchName);
    searchCardsByName(searchName);
})


const searchCardsByName = (name) => {
    fetch( apiBaseUrl + name, {
        method: 'GET',
      })
      .then( (response) => response.json())
      .then( (data) => {
          cards = data.data;
          renderSearchList();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

const castCard = (e) => {
    let cardIndex = cards.findIndex( (card) => {
        return card.id === e.currentTarget.getAttribute('data-id');
    });
    let cardContainer = renderCard(cards[cardIndex]);
    cardsOnBoardDiv.append(cardContainer);
    // add an event listener to each card
    cardContainer.addEventListener('click', removeCard);

    castCards.push(cards[cardIndex]);
    console.log(castCards);
}

const removeCard = (e) => {
    let cardIndex = castCards.findIndex( (card) => {
        return card.id === e.currentTarget.getAttribute('data-id');
    });
    console.log(castCards.length, removedCards.length, 'removing' + cardIndex);
    cardsOnBoardDiv.removeChild(cardsOnBoardDiv.childNodes[cardIndex+1]);
    removedCards.push(castCards.splice(cardIndex,1));
    console.log(castCards.length, removedCards.length, 'after removing' + cardIndex);
}

const renderSearchList = () => {
    if (cardSearchReturnDiv.childElementCount > 0) {
        cardSearchReturnDiv.removeChild(cardSearchReturnDiv.childNodes[0]);
    }
    let ulElement = document.createElement('ul');
    for (let i = 0; i < cards.length; i++) {
        let liElement = document.createElement('li');
        let cardContainer = renderCard(cards[i]);
        liElement.setAttribute('class','searchResultCard')
        liElement.append(cardContainer);
        ulElement.append(liElement);
        // add an event listener to each card
        cardContainer.addEventListener('click', castCard);
    }
    cardSearchReturnDiv.append(ulElement);
}
const renderCard = (card) => {
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class','flex card-layout');
    cardContainer.setAttribute('data-id',card.id); // unique id for card in the DB
    let leftCard = document.createElement('div');
    let cardNameElement = document.createElement('h2');
    let cardImageElement = document.createElement('img');
    let rightCard = document.createElement('div');
    let cardTextElement = document.createElement('p');
    let cardPowerToughness = document.createElement('p');
    cardPowerToughness.textContent = card.power + '/' + card.toughness
    cardNameElement.textContent = card.name;
    cardImageElement.setAttribute('src',card.image_uris.small);
    cardTextElement.textContent = card.oracle_text
    leftCard.append(cardImageElement);
    rightCard.append(cardNameElement);
    rightCard.append(cardTextElement);
    cardContainer.append(leftCard);
    cardContainer.append(rightCard);
    return cardContainer;
}