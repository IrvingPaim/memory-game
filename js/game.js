const grid = document.querySelector('.grid')

const spanPlayer1 = document.querySelector('.player1')
const spanPlayer2 = document.querySelector('.player2')
const scorePlayer1 = document.querySelector('.score__player1') // Corrigido o seletor
const scorePlayer2 = document.querySelector('.score__player2') // Corrigido o seletor
const timer = document.querySelector('.timer')

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
let currentPlayer = 1 // Adicionado para controlar o jogador atual
let scorePlayerOne = 0
let scorePlayerTwo = 0

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')
    if (disabledCards.length === 20) {
        clearInterval(this.loop)
        let winner = '';
        if (scorePlayerOne > scorePlayerTwo) {
            winner = localStorage.getItem('player1')
        } else if (scorePlayerTwo > scorePlayerOne) {
            winner = localStorage.getItem('player2')
        } else {
            winner = 'Empate'
        }
        alert(`Parabéns, ${winner}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

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

        if (currentPlayer === 1) {
            scorePlayerOne += 1
            scorePlayer1.innerHTML = scorePlayerOne // Atualiza a pontuação do jogador 1
        } else if (currentPlayer === 2) {
            scorePlayerTwo += 1
            scorePlayer2.innerHTML = scorePlayerTwo // Atualiza a pontuação do jogador 2
        }
        
        firstCard = ''
        secondCard = ''

        checkEndGame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''

            // Alternar entre os jogadores
            currentPlayer = currentPlayer === 1 ? 2 : 1
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

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1
    }, 1000)
}

window.onload = () => {
    
    const player1 = localStorage.getItem('player1')
    const player2 = localStorage.getItem('player2')
    
    spanPlayer1.innerHTML = `${player1}: `
    spanPlayer2.innerHTML = `${player2}: `
    scorePlayer1.innerHTML = `${scorePlayerOne}`
    scorePlayer2.innerHTML = `${scorePlayerTwo}`
    
    startTimer()
    loadGame()
}
