var play = false
function displayGame() {
    let menu = document.getElementById('divMenu')
    let game = document.getElementById('divGame')
    let body = document.getElementById('body')
    menu.style.display = 'none'
    game.style.display = 'block'
    body.style.backgroundImage = "url('../img/background2.png')"
    body.style.backgroundSize = 'cover'
    play = true
    empezarCronometro()
    // juego()
}


