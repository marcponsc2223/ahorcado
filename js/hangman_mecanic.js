let titulo = document.getElementById('titulo')
let palabraAdivinar = document.getElementById('palabraAdivinar')
let palabras = document.getElementById('palabras')
let cronometro = document.getElementById('tiempo')
let mostrarErrores = document.getElementById('errores')
let ahorcado = document.getElementById('hangman')
let mensajeAcabar = document.getElementById('mensajeAlAcabar')
let imagenAcabar = document.getElementById('imgAcabar')
let categoria = document.getElementById('categoria')
let arrayLetras = definirArrayLetras()
let array_Palabras
let array_Explicacion
let array_Imgs
let categoriaAleatoria = Math.floor(Math.random() * 3)
if (categoriaAleatoria === 0) {
    categoria.textContent = 'Cat: Naturaleza'
    array_Palabras = definirPalabrasNaturaleza()
    array_Explicacion = definirExplicacionNaturaleza()
    array_Imgs = imgNaturaleza()
} else if (categoriaAleatoria === 1) {
    categoria.textContent = 'Cat: Tecnologia'
    array_Palabras = definirPalabrasTecnologia()
    array_Explicacion = definirExplicacionTecnologia()
    array_Imgs = imgTecnologia()    
} else {
    categoria.textContent = 'Cat: Musica'
    array_Palabras = definirPalabrasMusica()
}
let parabraAleatoria = Math.floor(Math.random() * array_Palabras.length);
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
let palabraParaEncontrar = array_Palabras[parabraAleatoria].palabra
let palabraParaEncontrarSeparada = palabraParaEncontrar.split('')
mostrarMascara()
mostrarLetras()
// mostrarPalabraEncontrada()
document.addEventListener("keyup", function(event) {
    if (teclaDeshabilitada.has(event.code) || teclaDeshabilitada.has(event.key)) {
        event.preventDefault()
    } else {
        if (event.code === 'KeyA' || event.code === 'KeyB' || event.code === 'KeyC' || event.code === 'KeyD' || event.code === 'KeyE' || event.code === 'KeyF' || event.code === 'KeyG' || event.code === 'KeyH' || event.code === 'KeyI' || event.code === 'KeyJ' || event.code === 'KeyK' || event.code === 'KeyL' || event.code === 'KeyM' || event.code === 'KeyN' || event.code === 'KeyO' || event.code === 'KeyP' || event.code === 'KeyQ' || event.code === 'KeyR' || event.code === 'KeyS' || event.code === 'KeyT' || event.code === 'KeyU' || event.code === 'KeyV' || event.code === 'KeyW' || event.code === 'KeyX' || event.code === 'KeyY' || event.code === 'KeyZ' || event.key === 'ñ') {
            if (!palabraAdivinada) {
                teclado = true
                comprovarPalabrasSeleccionadas(event)
                teclaDeshabilitada.add(event.code)
            }
        }
        if (fallos === 5 || juegoAcabado || ganado) {
            if (ganado) {
                fraseAlAcabar = 'Has ganado,'
            } else if (fallos === 5) {
                fraseAlAcabar = 'Has perdido,'
            } 
            mensajeAcabar.textContent = fraseAlAcabar + ' la palabra era: "' + array_Palabras[parabraAleatoria].palabra + '". ' + array_Explicacion[parabraAleatoria].exp
            imagenAcabar.style.display = 'inline'
            imagenAcabar.src = array_Imgs[parabraAleatoria].img
        }
    }
});  
wordContainer.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN') {
        if (!palabraAdivinada) {
            teclado = false
            comprovarPalabrasSeleccionadas(event)
        }
    }
    if (fallos === 5 || juegoAcabado || ganado) {
        if (ganado) {
            fraseAlAcabar = 'Has ganado,'
        } else if (fallos === 5) {
            fraseAlAcabar = 'Has perdido,'
        } 
        mensajeAcabar.textContent = fraseAlAcabar + ' la palabra era: "' + array_Palabras[parabraAleatoria].palabra + '"'
    }
});
function update() {
    contador()
   
}
function comprovarPalabrasSeleccionadas(event) {
    let invalidarLetra
    let evento
    for (let index = 0; index < palabraParaEncontrar.length; index++) {
        //He colocado alguna letra o no?.
        if (teclado) {
            evento = event.key
        } else {
            evento = event.target.textContent
        }
        if (evento.toLowerCase() == palabraParaEncontrar[index]) {
            array_mascara[index].textContent = evento.toLowerCase()
            salir=index;
            aciertos++
        } 
    }
    if(!(palabraParaEncontrar[salir] == evento.toLowerCase())){
        errores++;
        fallos++;
        mostrarErrores.textContent = 'Errores: ' + fallos
        mostrarImagenesError(fallos)
    }
    if (aciertos >= palabraParaEncontrar.length) {
        ganado = true
    }
    let blancoTransparente = 'rgba(255, 255, 255, 0.638)'
    invalidarLetra = arrayLetras.indexOf(evento.toLowerCase())
    letrasSeleccionadas[invalidarLetra].style.transition = '0.8s'
    letrasSeleccionadas[invalidarLetra].style.backgroundColor = blancoTransparente
    letrasSeleccionadas[invalidarLetra].style.pointerEvents = 'none'
    letrasSeleccionadas[invalidarLetra].style.transform = 'rotateY(180deg)'
    // if (fraseCompleta === palabraParaEncontrar) {
    //     ganado = true
    // }      
}
function definirArrayLetras() {
    return ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
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
         { palabra: "melodia" },
         { palabra: "armonia" },
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
function mostrarMascara() {
    for (let index = 0; index < array_Palabras[parabraAleatoria].palabra.length; index++) {
        const mascara = document.createElement('span')
        document.querySelector('#palabraAdivinar').appendChild(mascara)
        mascara.classList.add('showMask')
        array_mascara.push(mascara)
        // Falta un <= porque sino da error
        for (let index2 = 0; index2 < array_mascara.length; index2++) {
            if (palabraParaEncontrar[index2] === ' ') {
                array_mascara[index2].classList.add('espacio')
                array_mascara[index2].textContent = ' '
                aciertos = 1
                console.log('espacio puesto');
            } else {
                array_mascara[index2].classList.remove('espacio')
                mascara.textContent = '_ '
            }
        }
        
    }
}
function mostrarLetras() {
    for (let index = 0; index < arrayLetras.length; index++) {
        const span = document.createElement('span')
        document.querySelector('.palabras').appendChild(span)
        span.textContent = arrayLetras[index]
        span.classList.add('spanOptions')
        span.classList.add('columnaCustom')
        if (arrayLetras[index] === ' ') {
            span.classList.add('teclaEspacio')
        }
        letrasSeleccionadas.push(span)
    }
}
// function mostrarPalabraEncontrada() {
//     // let categoria = document.getElementById('categoria')
//     // for (let index = 0; index < array_Palabras[parabraAleatoria].length; index++) {
//         // categoria.textContent = array_Palabras[parabraAleatoria].palabra
//     // }  
// }
function contador() {
  setTimeout(() => {
    cronometro.textContent = 'Tiempo: '+ tiempo
    tiempo++
}, 1000);    
}
function empezarCronometro() {
    // if (play) {
        setInterval(() => {
            update()
        }, 1000); 
    // }
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