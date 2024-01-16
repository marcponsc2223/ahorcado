var play = false

function displayGame() {
    if (!(localStorage.getItem('letrasUsadas'))) {
        let menu = document.getElementById('divMenu')
        let game = document.getElementById('divGame')
        let body = document.getElementById('body')
        let playerName = document.getElementById('name')
        var cartelNombreJugador = document.getElementById('nombreJugador')
        menu.style.display = 'none'
        game.style.display = 'block'
        body.style.backgroundImage = "url('../img/background2.png')"
        body.style.backgroundSize = 'cover'
        play = true
        cartelNombreJugador.textContent = 'Nombre: ' + playerName.value
        localStorage.setItem('nombre', playerName.value)
    }
    empezarCronometro()
    empezarJuego()
    // juego()
}


