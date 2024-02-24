const grid = document.querySelector('.grid')

const characters = [
   'beth', 
   'jerry',
   'jessica',
   'morty',
   'pessoa-passaro',
   'pickle-rick',
   'rick',
   'summer',
   'meeseeks',
   'scroopy'
]

let firstCard = ''
let secondCard = ''

const createElements = (tags, classes) => {
    const element = document.createElement(tags)
    element.className = classes
    return element
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')
        
        firstCard = ''
        secondCard = ''
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 500)

    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return                       
    } 

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }
 
}

const createCard = (character) => {

    const card = createElements('div', 'card')
    const front = createElements('div', 'face front')
    const back = createElements('div', 'face back')

    front.style.backgroundImage = `url(../images/${character}.png)`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card

}

const loadGame = () => {
    const duplicateCharacters = [ ...characters, ...characters ]
    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    suffledArray.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
    })
}

loadGame()

