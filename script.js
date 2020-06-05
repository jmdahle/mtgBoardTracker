
let  apiBaseUrl = 'https://api.scryfall.com/cards/search?q=';

// Page references
const searchBtn = document.getElementById('searchBtn');
const searchText = document.getElementById('cardNameSearchText');
const cardSearchReturnDiv = document.getElementById('cardSearchReturn');

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let searchName = searchText.value;
    searchCardsByName(searchName);
})


const searchCardsByName = (name) => {
    fetch( apiBaseUrl + name, {
        method: 'GET',
      })
      .then( (response) => response.json())
      .then( (data) => {
          renderCards(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

const renderCards = (cards) => {
    console.log(cards)
    if (cardSearchReturnDiv.childElementCount > 0) {
        cardSearchReturnDiv.removeChild(cardSearchReturnDiv.childNodes[0]);
    }
    
    let ulElement = document.createElement('ul');
    for (let i = 0; i < cards.length; i++) {
        let liElement = document.createElement('li');
        let cardContainer = document.createElement('div');
        cardContainer.setAttribute('class','flex');
        let leftCard = document.createElement('div');
        let cardNameElement = document.createElement('h2');
        let cardImageElement = document.createElement('img');
        let rightCard = document.createElement('div');
        let cardTextElement = document.createElement('p');
        cardNameElement.textContent = cards[i].name;
        cardImageElement.setAttribute('src',cards[i].image_uris.normal);
        cardTextElement.textContent = cards[i].oracle_text
        leftCard.append(cardImageElement);
        rightCard.append(cardNameElement);
        rightCard.append(cardTextElement);
        cardContainer.append(leftCard);
        cardContainer.append(rightCard);
        liElement.append(cardContainer);
        ulElement.append(liElement);
    }
    cardSearchReturnDiv.append(ulElement);
}
