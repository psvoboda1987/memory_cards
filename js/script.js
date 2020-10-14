window.onload = () => {

    let overlay = document.getElementById('overlay');

    document.getElementById('add_card').addEventListener('click', (event) => {

        event.preventDefault();

        cleanForm();

        show(overlay);

    });

    document.getElementById('close-form').addEventListener('click', (event) => {

        event.preventDefault();

        hide(overlay);

    });

    document.getElementById('new_card').addEventListener('click', (event) => {

        event.preventDefault();

        if (addCard() === false) return;

        location.reload();

    });

    document.getElementById('clear_cards').addEventListener('click', (event) => {

        event.preventDefault();

        clearCards();

    });

    document.getElementById('prev').addEventListener('click', (event) => {

        event.preventDefault();

        prevCard();

    });

    document.getElementById('next').addEventListener('click', (event) => {

        event.preventDefault();

        nextCard();

    });

    startApp();

}

function startApp() {

    showCards();

    initFlipCard();

    initCardSlider();

    initDeleteCard();

    initClearCards();

}

function initClearCards() {

    let cards = getCards();
    if (cards.length === 0) return;

    show(document.getElementById('clear_cards'));

}

function showCards() {

    let cards = getCardsData();
    let cardsHtml = document.getElementById('cards');
    let html = '';
    let counter = 1;

    for (let card of cards) {

        html += `
            <div class="card d-inline-block" data-counter=${counter}>
                <div class="front bg-green border-radius-medium p-20 bold white">
                    <p class="question">${card[0]}</p>
                </div>
                <div class="back hide bg-orange border-radius-medium p-20 bold white">
                    <p class="answer">${card[1]}</p>
                </div>
                <span class="flip-icon">flip</span>
                <div class="delete-card"><span>&times;</span> delete this card</div>
            </div>
        `;

        counter++;

    }

    cardsHtml.innerHTML = html;

}

function initFlipCard() {

    let cards = getCards();
    cards = Array.from(cards);

    cards.forEach((card) => {

        card.addEventListener('click', (event) => {

            event.preventDefault();

            flipCard(card);

        });

    });

}

function getCards() {

    return document.getElementsByClassName('card');

}

function initDeleteCard() {

    let deleteBtns = document.getElementsByClassName('delete-card');

    for (let deleteBtn of deleteBtns) {

        deleteBtn.addEventListener('click', (event) => {

            event.preventDefault();

            if (confirm('delete?') === false) return;

            alert('Notice: card deleted');

            localStorage.removeItem(event.target.parentElement.children[0].innerText);

            location.reload();

        });

    }

}

function initCardSlider() {

    let cards = getCards();
    if (cards.length === 0) return;

    shuffle(cards);

    for (let card of cards) hide(card);

    show(cards[0]);

    updateCounter(cards[0].dataset.counter);

}

function shuffle(items) {

    // TODO:
    // items.sort(() => Math.random() - 0.5);
    Array.from(items).sort(() => Math.random() - 0.5);

}

function nextCard() {

    let cards = getCards();

    for (let card of cards) {
        
        if (card.classList.contains('hide')) continue;
        if (card.nextElementSibling === null) return;

        updateCounter(card.nextElementSibling.dataset.counter);

        show(card.nextElementSibling);
        hide(card);

        break;

    }

}

function prevCard() {

    let cards = getCards();

    for (let card of cards) {

        if (card.classList.contains('hide')) continue;
        if (card.previousElementSibling === null) return;

        updateCounter(card.previousElementSibling.dataset.counter);

        show(card.previousElementSibling);
        hide(card);

        break;

    }

}

function show(element) {

    if (element.classList.contains('hide')) element.classList.remove('hide');

}

function hide(element) {

    if (! element.classList.contains('hide')) element.classList.add('hide');

}

function getCardsData() {

    let i = 0;
    let cardCount = localStorage.length;
    let cards = [];

    for (i; i < cardCount; i++) {

        cards.push([localStorage.key(i), localStorage[[localStorage.key(i)]]]);

    }

    return cards;

}

function updateCounter(index) {

    let cards = getCards();
    let count = cards.length;
    let counter = document.getElementById('counter');

    counter.innerHTML = `${index} / ${count}`;

}

function cleanForm() {

    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';

}

function addCard() {

    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    if (question == '' || answer == '') return false;
    let overlay = document.getElementById('overlay');

    saveItem(question, answer);

    hide(overlay);

    alert('card added');

    return true;

}

function saveItem(question, answer) {

    localStorage.setItem(question, answer);

}

function clearCards() {

    if (confirm('delete?') === false) return;

    localStorage.clear();

    alert('Notice: card deleted');

    location.reload();

}

function flipCard(card) {

    console.log(card);

    let front = card.children[0];
    // let front = card.firstElementSibling;
    let back = card.children[1];
    // let back = card.nextElementSibling;
    // console.log(back);

    if (back.classList.contains('hide')) {

        show(back);
        hide(front);

    }
    else {

        show(front);
        hide(back);

    }

}