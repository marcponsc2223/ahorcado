let jugando = false
let localStorageJugando = 'Veces Jugadas'
let localStoragePalabra = 'Palabra'
let localStorageCategoria = 'Categoria'
let titulo = document.getElementById('titulo')
let palabraAdivinar = document.getElementById('palabraAdivinar')
let palabras = document.getElementById('palabras')
let cronometro = document.getElementById('tiempo')
let mostrarErrores = document.getElementById('errores')
let ahorcado = document.getElementById('hangman')
let mensajeAcabar = document.getElementById('mensajeAlAcabar')
let imagenAcabar = document.getElementById('imgAcabar')
let categoria = document.getElementById('categoria')
let letraClickada_pulsada = 0

let arrayLetras = definirArrayLetras()
let invalidarLetra
let evento
let array_Palabras
let array_Explicacion
let array_Imgs
let letrasSeleccionadas = []
let array_mascara = []
let fallos = 0
let tiempo = 0
let errores = 0
let aciertos = 0
let ganado = false
let salir = 0
let teclado = false
const teclaDeshabilitada = new Set()
let fraseAlAcabar
let fraseCompleta = ''
const wordContainer = palabras
let palabraAdivinada = false
let juegoAcabado = false
let parabraAleatoria
let palabraParaEncontrar
let letrasDelPrincipio = true


/** Creando las local storages */
if (!localStorage.getItem(localStorageJugando)) {
    let categoriaAleatoria = Math.floor(Math.random() * 3)
    if (categoriaAleatoria === 0) {
        categoria.textContent = 'Cat: Naturaleza'
        array_Palabras = definirPalabrasNaturaleza()
        array_Explicacion = definirExplicacionNaturaleza()
        array_Imgs = imgNaturaleza()
        localStorage.setItem(localStorageCategoria, 'naturaleza')
    } else if (categoriaAleatoria === 1) {
        categoria.textContent = 'Cat: Tecnologia'
        array_Palabras = definirPalabrasTecnologia()
        array_Explicacion = definirExplicacionTecnologia()
        array_Imgs = imgTecnologia()    
        localStorage.setItem(localStorageCategoria, 'tecnologia')
    } else {
        categoria.textContent = 'Cat: Musica'
        array_Palabras = definirPalabrasMusica()
        array_Explicacion = definirExplicacionMusica()
        array_Imgs = imgMusica() 
        localStorage.setItem(localStorageCategoria, 'musica') 
    }
    parabraAleatoria = Math.floor(Math.random() * array_Palabras.length);
    palabraParaEncontrar = array_Palabras[parabraAleatoria].palabra
    localStorage.setItem(localStoragePalabra, palabraParaEncontrar)
    // SESIONES LOCALES DE LOS ARRAYS
    let stringArrayPalabras = JSON.stringify(array_Palabras)
    localStorage.setItem('arrayPalabras', stringArrayPalabras)

    let stringArrayExp = JSON.stringify(array_Explicacion)
    localStorage.setItem('arrayExp', stringArrayExp)

    let stringArrayImg = JSON.stringify(array_Imgs)
    localStorage.setItem('arrayImg', stringArrayImg)

    jugando = true
    localStorage.setItem('palabraAleatoria', parabraAleatoria)
    localStorage.setItem(localStorageJugando, jugando)
    
    cartelNombreJugador.textContent = 'Nombre: ' + localStorage.getItem('nombre')
}
let palabraParaEncontrarSeparada = localStorage.getItem(localStoragePalabra).split('')
categoria.textContent = localStorage.getItem(localStorageCategoria)
let letrasUsadas = ''
let arrayStringsLocalStorage = []
mostrarMascara()
mostrarLetras()
/** Condición para bloquear las letras usadas cuando recargue la página. */
if (localStorage.getItem('letrasUsadas')) {
    arrayStringsLocalStorage = localStorage.getItem('letrasUsadas').split('')
    for (let index = 0; index < arrayStringsLocalStorage.length; index++) {
        teclaDeshabilitada.add(arrayStringsLocalStorage[index])
    }
    comprovarPalabrasSeleccionadas(arrayStringsLocalStorage)
    letrasDelPrincipio = false
}
function empezarJuego() {
    /** Evento para escribir la letra con el teclado. */
    document.addEventListener("keyup", function(event) {
    if (teclaDeshabilitada.has(event.code) || teclaDeshabilitada.has(event.key)) {
        event.preventDefault()
    } else {
        if (event.code === 'KeyA' || event.code === 'KeyB' || event.code === 'KeyC' || event.code === 'KeyD' || event.code === 'KeyE' || event.code === 'KeyF' || event.code === 'KeyG' || event.code === 'KeyH' || event.code === 'KeyI' || event.code === 'KeyJ' || event.code === 'KeyK' || event.code === 'KeyL' || event.code === 'KeyM' || event.code === 'KeyN' || event.code === 'KeyO' || event.code === 'KeyP' || event.code === 'KeyQ' || event.code === 'KeyR' || event.code === 'KeyS' || event.code === 'KeyT' || event.code === 'KeyU' || event.code === 'KeyV' || event.code === 'KeyW' || event.code === 'KeyX' || event.code === 'KeyY' || event.code === 'KeyZ' || event.key === 'ñ') {
            if (!palabraAdivinada) {
                teclado = true
                if (localStorage.getItem('letrasUsadas')) {
                    letrasUsadas = localStorage.getItem('letrasUsadas')
                }
                letrasDelPrincipio = false
                letrasUsadas += event.key
                localStorage.setItem('letrasUsadas', letrasUsadas)
                arrayStringsLocalStorage = localStorage.getItem('letrasUsadas').split('')
                comprovarPalabrasSeleccionadas(event)
                teclaDeshabilitada.add(event.code)
            }
        }
        if (fallos === 5 || juegoAcabado || ganado) {
            if (ganado) {
                fraseAlAcabar = 'Has ganado,'
                jugando = false
            } else if (fallos === 5) {
                fraseAlAcabar = 'Has perdido,'
            } 
            // SACAR LOS VALORES DE LAS SESIONES
            stringArray = localStorage.getItem('arrayPalabras')
            arrayEnString = JSON.parse(stringArray)
    
            stringArrayExp = localStorage.getItem('arrayExp')
            arrayExpEnString = JSON.parse(stringArrayExp)
    
            stringArrayImg = localStorage.getItem('arrayImg')
            arrayImgEnString = JSON.parse(stringArrayImg)
    
            mensajeAcabar.textContent = fraseAlAcabar + ' la palabra era: "' + arrayEnString[parseInt(localStorage.getItem('palabraAleatoria'))].palabra + '". ' + arrayExpEnString[parseInt(localStorage.getItem('palabraAleatoria'))].exp
            imagenAcabar.style.display = 'inline'
            imagenAcabar.src = arrayImgEnString[parseInt(localStorage.getItem('palabraAleatoria'))].img
            localStorage.clear()
            tiempo = 0
            recargarPagina()
        }
    }
    }); 
    /** Evento para clickar la letra. */ 
    wordContainer.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN') {
        if (!palabraAdivinada) {
            teclado = false
            if (localStorage.getItem('letrasUsadas')) {
                letrasUsadas = localStorage.getItem('letrasUsadas')
            }
            letrasDelPrincipio = false
            letrasUsadas += event.target.textContent
            localStorage.setItem('letrasUsadas', letrasUsadas)
            arrayStringsLocalStorage = localStorage.getItem('letrasUsadas').split('')
            comprovarPalabrasSeleccionadas(event)
            letraClickada_pulsada = event.target.textContent
        }
    }
    if (fallos === 5 || juegoAcabado || ganado) {
        if (ganado) {
            fraseAlAcabar = 'Has ganado,'
            jugando = false
        } else if (fallos === 5) {
            fraseAlAcabar = 'Has perdido,'
        } 
        // SACAR LOS VALORES DE LAS SESIONES
        stringArray = localStorage.getItem('arrayPalabras')
        arrayEnString = JSON.parse(stringArray)
    
        stringArrayExp = localStorage.getItem('arrayExp')
        arrayExpEnString = JSON.parse(stringArrayExp)
    
        stringArrayImg = localStorage.getItem('arrayImg')
        arrayImgEnString = JSON.parse(stringArrayImg)
    
        mensajeAcabar.textContent = fraseAlAcabar + ' la palabra era: "' + arrayEnString[parseInt(localStorage.getItem('palabraAleatoria'))].palabra + '". ' + arrayExpEnString[parseInt(localStorage.getItem('palabraAleatoria'))].exp
        imagenAcabar.style.display = 'inline'
        imagenAcabar.src = arrayImgEnString[parseInt(localStorage.getItem('palabraAleatoria'))].img
        localStorage.clear()
        tiempo = 0
        recargarPagina()
    }
    });
}
/** Función para llamar al contador. */
function update() {
    contador()
   
}
/** Función para comprovar si la letra está en la palabra o no mediante las local storage. */
function comprovarPalabrasSeleccionadas(event) {
    for (let index = 0; index < localStorage.getItem(localStoragePalabra).length; index++) {
        if (letrasDelPrincipio) {
            for (let tamanoEvent = 0; tamanoEvent < event.length; tamanoEvent++) {
                if (event[tamanoEvent].toLowerCase() === localStorage.getItem(localStoragePalabra)[index]) {
                    array_mascara[index].textContent = event[tamanoEvent].toLowerCase()
                    salir=index;
                }   
            }
            evento = event
        } else {
            //He colocado alguna letra o no?.
            if (teclado) {
                evento = event.key
            } else {
                evento = event.target.textContent
            }
            if (evento.toLowerCase() == localStorage.getItem(localStoragePalabra)[index]) {
                array_mascara[index].textContent = evento.toLowerCase()
                salir=index;
                // Actualizar los datos de la localStorage de los aciertos.
                if (localStorage.getItem('aciertos')) {
                    aciertos = localStorage.getItem('aciertos')
                }
                aciertos++
                localStorage.setItem('aciertos', aciertos)
            } 
        }
    } 
    if (letrasDelPrincipio) {
        for (let index2 = 0; index2 < event.length; index2++) {
            if(!(localStorage.getItem(localStoragePalabra)[salir] == evento[index2].toLowerCase())){
                    if (localStorage.getItem('fallos')) {                    
                        mostrarErrores.textContent = 'Errores: ' + localStorage.getItem('fallos')
                        mostrarImagenesError(localStorage.getItem('fallos'))   
                    }
                } 
        }
    } else {
        if(!(localStorage.getItem(localStoragePalabra)[salir] == evento.toLowerCase())){
                if (localStorage.getItem('fallos')) {
                    fallos = localStorage.getItem('fallos')
                }
                errores++
                fallos++
                localStorage.setItem('fallos', fallos)
                mostrarErrores.textContent = 'Errores: ' + fallos
                mostrarImagenesError(fallos)
            } 
    }
     if (parseInt(localStorage.getItem('aciertos')) >= localStorage.getItem(localStoragePalabra).length) {
        ganado = true
    }
    bloquearPalabras()
}
function recargarPagina() {
    setTimeout(() => {
        location.reload()
    }, 7000);
}
/** Función para bloquear la letra una vez la ha pulsado en caso de que recargue la página. */
function bloqueoAntesDeJugar(event) {
    for (let index = 0; index < localStorage.getItem('letrasUsadas').length; index++) {
        let eventPorCadaLetraDelArray = ''
        if (event[index] === localStorage.getItem('letrasUsadas')) {
            eventPorCadaLetraDelArray = event[index]
        } 
        bloquearPalabras()
    }
}
/** Función para bloquear la letra una vez la ha pulsado. */
function bloquearPalabras() {
    // for (let index = 0; index < arrayStringsLocalStorage.length; index++) {
    //     let letras = document.getElementById(arrayStringsLocalStorage[index].toLowerCase())
    //     let blancoTransparente = 'rgba(255, 255, 255, 0.638)'
    //     letras.style.transition = '0.8s'
    //     letras.style.backgroundColor = blancoTransparente
    //     letras.style.pointerEvents = 'none'
    //     letras.style.transform = 'rotateY(180deg)'   
    // } 
    let letras = document.getElementById(letraClickada_pulsada.toLowerCase())
    let blancoTransparente = 'rgba(255, 255, 255, 0.638)'
    letras.style.transition = '0.8s'
    letras.style.backgroundColor = blancoTransparente
    letras.style.pointerEvents = 'none'
    letras.style.transform = 'rotateY(180deg)'   
    
}
function definirArrayLetras() {
    return ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
}
function hola() {
    return[
        {categoria: 'hola',
        palabra: 'adios',
        exp: 'pepe'}
    ]
}
function definirPalabrasNaturaleza() {
   return [
        { palabra: "arbol" },
        { palabra: "rio" },
        { palabra: 'montaña' },
        { palabra: 'flores' },
        { palabra: 'cielo' },
        { palabra: 'bosque' },
        { palabra: 'mariposa' },
        { palabra: 'amanecer' },
        { palabra: 'cascada' },
        { palabra: 'pradera' },
    ]
}
function definirExplicacionNaturaleza() {
    return [
        {exp: "Planta de tallo leñoso que se ramifica a cierta altura del suelo." },
        {exp: "Corriente de agua que fluye con continuidad por un cauce." },
        {exp: 'Una montaña es una figura topográfica del relieve terrestre positiva, una eminencia natural que se caracteriza por su altitud y, más generalmente, por su altura relativa, o incluso por su volumen, pendiente, espaciado o continuidad.' },
        {exp: 'La flor es la estructura reproductiva característica de las plantas llamadas espermatofitas o fanerógamas.' },
        {exp: 'Cielo se define a menudo como el espacio en el que se mueven los astros y que por efecto visual parece rodear la Tierra.' },
        {exp: 'Un ecosistema donde la vegetación predominante la constituyen los árboles y arbustos.' },
        {exp: 'Los lepidópteros son un orden de insectos holometábolos, casi siempre voladores, conocidos comúnmente como mariposas.' },
        {exp: 'Respecto a un observador, un astro está en el orto cuando atraviesa el plano del horizonte y entra en el campo visual del observador.' },
        {exp: 'Se llama cascada al tramo de un curso fluvial donde el agua cae verticalmente por efecto de la gravedad.' },
        {exp: 'Los pastizales y matorrales templados o dicho de otro modo, las praderas y estepas, conforman un bioma cuyos ecosistemas predominantes lo constituyen los herbazales de clima templado entre semiárido y húmedo, con una estación cálida y otra marcadamente fría en invierno.' },
    ]
}
function imgNaturaleza() {{ 
    return [
        {img: "../img/arbol.png"}, 
        {img: "../img/rio.jpg"},
        {img: "../img/montana.png"},
        {img: "../img/flores.png"},
        {img: "../img/cielo.jpg"},
        {img: "../img/bosque.jpg"},
        {img: "../img/mariposa.png"},
        {img: "../img/amanecer.png"},
        {img: "../img/cascada.png"},
        {img: "../img/pradera.png"},
    ]
}}
function definirPalabrasTecnologia() {  
    return [
         { palabra: "algortimo" },
         { palabra: "inteligencia artificial" },
         { palabra: 'criptomoneda' },
         { palabra: 'realidad aumentada' },
         { palabra: 'ciberseguridad' },
         { palabra: 'big data' },
         { palabra: 'nube' },
         { palabra: 'redes neuronales' },
         { palabra: 'programacion' },
         { palabra: 'iot' },
     ]
}
function definirExplicacionTecnologia() {
    return [
        {exp: "Es un conjunto de instrucciones o reglas definidas y no-ambiguas, ordenadas y finitas que permite, típicamente, solucionar un problema, realizar un cómputo, procesar datos y llevar a cabo otras tareas o actividades." },
        {exp: "La inteligencia artificial, en el contexto de las ciencias de la computación, es una disciplina y un conjunto de capacidades cognoscitivas e intelectuales expresadas por sistemas informáticos." },
        {exp: 'Una criptomoneda es un medio digital de intercambio que utiliza criptografía fuerte para asegurar las transacciones, controlar la creación de unidades adicionales y verificar la transferencia de activos usando tecnologías de registro distribuido.' },
        {exp: 'La realidad aumentada es el término que se usa para describir al conjunto de tecnologías que permiten que un usuario visualice parte del mundo real a través de un dispositivo tecnológico con información gráfica añadida por este.' },
        {exp: 'Es el área relacionada con la informática y la telemática que se enfoca en la protección de la infraestructura computacional.' },
        {exp: 'Los macrodatos, también llamados datos masivos, inteligencia de datos, datos a gran escala es un término que hace referencia a conjuntos de datos tan grandes y complejos que precisan de aplicaciones informáticas no tradicionales de procesamiento de datos para tratarlos adecuadamente.' },
        {exp: 'La nube es el uso de una red de servidores remotos conectados a internet para almacenar, administrar y procesar datos, servidores, bases de datos, redes y software.' },
        {exp: 'Las redes neuronales artificiales son un modelo computacional evolucionado a partir de diversas aportaciones científicas que están registradas en la historia.' },
        {exp: 'La programación es el proceso de crear un conjunto de instrucciones que le dicen a una computadora como realizar algún tipo de tarea.' },
        {exp: 'El Internet de las cosas describe objetos físicos con sensores, capacidad de procesamiento, software y otras que se conectan e intercambian datos con otros dispositivos y sistemas a través de internet u otras redes de comunicación.' },
    ]
}
function imgTecnologia() {{ 
    return [
        {img: "../img/algoritmo.png"}, 
        {img: "../img/ia.png"},
        {img: "../img/criptomoneda.jpg"},
        {img: "../img/realidad_aumentada.png"},
        {img: "../img/ciberseguridad.png"},
        {img: "../img/big_data.jpg"},
        {img: "../img/nube.png"},
        {img: "../img/redes_neuronales.png"},
        {img: "../img/programacion.png"},
        {img: "../img/iot.png"},
    ]
}}
function definirPalabrasMusica() {
    return [
         { palabra: 'melodia' },
         { palabra: 'armonia' },
         { palabra: 'ritmo' },
         { palabra: 'partitura' },
         { palabra: 'acorde' },
         { palabra: 'instrumento' },
         { palabra: 'nota' },
         { palabra: 'sonata' },
         { palabra: 'concierto' },
         { palabra: 'sinfonia' },
     ]
}
function definirExplicacionMusica() {
    return [
         { exp: 'Una melodía es una sucesión de sonidos que es percibida como una sola entidad. ' },
         { exp: 'La armonía o harmonía es el estudio de la técnica para enlazar acordes, también engloba conceptos como ritmo armónico.' },
         { exp: 'El ritmo, como un recurso fundamental en la visualidad, puede definirse generalmente como un «movimiento marcado por la sucesión regular de elementos débiles y fuertes, o bien de condiciones opuestas o diferentes».' },
         { exp: 'Una partitura es un documento manuscrito o impreso que representa e indica cómo debe interpretarse una composición musical, mediante un lenguaje propio formado por signos musicales y el llamado sistema de notación.' },
         { exp: 'En música y teoría musical, un acorde consiste en un conjunto de dos o más notas diferentes y que constituyen una unidad armónica.' },
         { exp: 'Un instrumento musical es un sistema compuesto por la combinación de uno o más sistemas resonantes y medios para su vibración, construido con el fin de producir sonido en uno o más tonos que puedan ser combinados por un intérprete para producir música.' },
         { exp: 'Las notas musicales se utilizan en la notación musical para representar la altura y la duración relativa de un sonido, se suele emplear la acepción «figura musical».' },
         { exp: 'El término sonata es el nombre dado a distintas formas musicales, empleadas desde el período barroco hasta las experiencias más futurísticas de la música contemporánea.' },
         { exp: 'Un concierto es una expresión cultural musical en la «que se ejecutan composiciones sueltas».' },
         { exp: 'Una sinfonía es un tipo de composición musical extendida en la música clásica occidental y compuesta la mayoría de las veces para orquesta. Generalmente, está dividida en cuatro movimientos, cada uno con un momento y estructura diferente.' },
     ]
}
function imgMusica() {{ 
    return [
        {img: "../img/melodia.png"}, 
        {img: "../img/armonia.png"},
        {img: "../img/ritmo.png"},
        {img: "../img/partitura.png"},
        {img: "../img/acorde.png"},
        {img: "../img/instrumento.png"},
        {img: "../img/nota.png"},
        {img: "../img/sonata.png"},
        {img: "../img/concierto.jpg"},
        {img: "../img/sinfonia.jpg"},
    ]
}}
/** Función para mostrar la máscara de letras de la palabra en guíones. */
function mostrarMascara() {
    let stringArray = localStorage.getItem('arrayPalabras')
    let arrayEnString = JSON.parse(stringArray)
    for (let index = 0; index < arrayEnString[parseInt(localStorage.getItem('palabraAleatoria'))].palabra.length; index++) {
        const mascara = document.createElement('span')
        document.querySelector('#palabraAdivinar').appendChild(mascara)
        mascara.classList.add('showMask')
        array_mascara.push(mascara)
        for (let index2 = 0; index2 < array_mascara.length; index2++) {
            if (localStorage.getItem(localStoragePalabra)[index2] === ' ') {
                array_mascara[index2].classList.add('espacio')
                array_mascara[index2].textContent = ' '
                aciertos = 1
            } else {
                array_mascara[index2].classList.remove('espacio')
                mascara.textContent = '_ '
            }
        }
    }
}
/** Función para mostrar todas las letras por pantalla. */
function mostrarLetras() {
    for (let index = 0; index < arrayLetras.length; index++) {
        const span = document.createElement('span')
        document.querySelector('.palabras').appendChild(span)
        span.textContent = arrayLetras[index]
        span.classList.add('spanOptions')
        span.classList.add('columnaCustom')
        span.id = arrayLetras[index]
        if (arrayLetras[index] === ' ') {
            span.classList.add('teclaEspacio')
        }
        letrasSeleccionadas.push(span)
    }
}
/** Función que hace de contador. */
function contador() {
    if (fallos < 5 && !juegoAcabado && !ganado) {
        setTimeout(() => {
            if (localStorage.getItem('tiempo')) {
             tiempo = localStorage.getItem('tiempo')   
            }
            cronometro.textContent = 'Tiempo: '+ tiempo
            tiempo++
            localStorage.setItem('tiempo', tiempo)
        }, 1000);
    }    
}
function empezarCronometro() {
    setInterval(() => {
        update()
    }, 1000); 
}
function mostrarImagenesError(fallos) {
    switch (fallos) {
        case 1: ahorcado.setAttribute('src', '../img/hangman_1.png')
            break;
        case 2: ahorcado.setAttribute('src', '../img/hangman_2.png')
            break;
        case 3: ahorcado.setAttribute('src', '../img/hangman_3.png')
            break;
        case 4: ahorcado.setAttribute('src', '../img/hangman_4.png')
            break;
        case 5: ahorcado.setAttribute('src', '../img/hangman_5.png')
    }
}