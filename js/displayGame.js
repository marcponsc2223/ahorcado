var play = false
var cartelNombreJugador = document.getElementById('nombreJugador')
var menu = document.getElementById('divMenu')
var game = document.getElementById('divGame')
function displayGame() {
    let body = document.getElementById('body')
    let playerName = document.getElementById('name')
    menu.style.display = 'none'
    game.style.display = 'block'
    body.style.backgroundImage = "url('../img/background2.png')"
    body.style.backgroundSize = 'cover'
    play = true

    if (!localStorage.getItem('nombre')) {
        localStorage.setItem('nombre', playerName.value)
    } 
    
    if (localStorage.getItem('nombre') == '') {
        localStorage.setItem('nombre', 'Concursante')
    }
    cartelNombreJugador.textContent = 'Nombre: ' + localStorage.getItem('nombre')
    console.log('no has usado ninguna letra');
    // }
    empezarCronometro()
    empezarJuego()
    // juego()
}


