const inputFirstPlayer = document.querySelector('.login__input1')
const inputSecondPlayer = document.querySelector('.login__input2')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login-form')

const validateInput = () => {
    if (inputFirstPlayer.value.length > 2 && inputSecondPlayer.value.length > 2) {
        button.removeAttribute('disabled')
        return
    }

    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('player1', inputFirstPlayer.value)
    localStorage.setItem('player2', inputSecondPlayer.value)
    
    window.location = 'pages/game.html'
}

inputFirstPlayer.addEventListener('input', validateInput)
inputSecondPlayer.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)