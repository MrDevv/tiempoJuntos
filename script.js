import {mensajes} from "./js/data.js";

// cartas
const sobre1 = document.querySelector("#sobre1");
const carta1= document.querySelector(".carta-1");

const sobre2 = document.querySelector("#sobre2");
const carta2= document.querySelector(".carta-2");
const opacityCarta = document.querySelector(".opacidad");

const botonCerrar1 = document.querySelector("#boton-cerrar-1");
const botonCerrar2 = document.querySelector("#boton-cerrar-2");

const estadoAnio = new Date();


function mostrarCarta(){
    if (estadoAnio.getFullYear() == 2026) {
        sobre2.hidden = false
        carta2.hidden = false
    }
}


mostrarCarta();



// Abrir sobre 1
sobre1.addEventListener("click", () => {    
    opacityCarta.style.display = "block";
    carta1.classList.add("carta-1--show");
    carta1.querySelector(".texto").hidden = false;
    carta1.querySelector(".marco-carta").hidden = false;
    carta1.querySelector(".boton-cerrar").style.display = "block";
    carta1.querySelector(".yuta-carta").style.display = "block";
    carta1.querySelector(".gojo-carta").style.display = "block";

    carta1.querySelector(".texto").innerHTML = mensajes[0];
});

// Abrir sobre 2
sobre2.addEventListener("click", () => {
    opacityCarta.style.display = "block";
    carta2.classList.add("carta-2--show");
    carta2.querySelector(".texto").hidden = false;
    carta2.querySelector(".marco-carta").hidden = false;
    carta2.querySelector(".yuta-maki-carta").style.display = "block";
    
    carta2.querySelector(".boton-cerrar").style.display = "block";

    carta2.querySelector(".texto").innerHTML = mensajes[1];
});

// Cerrar carta 1
botonCerrar1.addEventListener("click", () => {
    carta1.classList.remove("carta-1--show");
    opacityCarta.style.display = "none";
    carta1.querySelector(".texto").hidden = true;
    carta1.querySelector(".marco-carta").hidden = true;
    carta1.querySelector(".yuta-carta").style.display = "none";
    carta1.querySelector(".gojo-carta").style.display = "none";
    
    carta1.querySelector(".boton-cerrar").style.display = "none";
});

// Cerrar carta 2
botonCerrar2.addEventListener("click", () => {
    carta2.classList.remove("carta-2--show");
    opacityCarta.style.display = "none";
    carta2.querySelector(".texto").hidden = true;
    carta2.querySelector(".marco-carta").hidden = true;
    carta2.querySelector(".yuta-maki-carta").style.display = "none";

    carta2.querySelector(".boton-cerrar").style.display = "none";
});


// contador
const fechaInicio = new Date(2025, 8, 28, 0, 0, 0);

function calcularTiempo(inicio, ahora) {
    let anios = ahora.getFullYear() - inicio.getFullYear();
    let meses = (ahora.getMonth() - inicio.getMonth()) + 1;
    let dias = ahora.getDate() - inicio.getDate();
    let horas = ahora.getHours() - inicio.getHours();
    let minutos = ahora.getMinutes() - inicio.getMinutes();
    let segundos = ahora.getSeconds() - inicio.getSeconds();

    if (dias < 0) {
        const ultimoMes = new Date(ahora.getFullYear(), ahora.getMonth(), 0)
                                .getDate();

        dias += ultimoMes;
        meses--;
    }

    if (meses < 0) {
        meses += 12;
        anios--;
    }

    return { anios, meses, dias, horas, minutos, segundos };
}

function actualizar() {
    const ahora = new Date();
    const t = calcularTiempo(fechaInicio, ahora);
    const cajaAnio = document.getElementById("anios");

    if (t.anios != 0) {
        cajaAnio.parentElement.style.display = "flex";
        cajaAnio.textContent = t.anios;
    }
    else{
        
        cajaAnio.parentElement.style.display = "none";
    }

    document.getElementById("meses").textContent = t.meses;
    document.getElementById("dias").textContent = t.dias;
    document.getElementById("horas").textContent = t.horas;
    document.getElementById("minutos").textContent = t.minutos;
    document.getElementById("segundos").textContent = t.segundos;
}

setInterval(actualizar, 1000);
actualizar();


// reproductor
const tituloCancion = document.querySelector('.reproductor .titulo');
const autorCancion = document.querySelector('.reproductor .autor');


const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const inconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles .boton-reproducir-pausar');

const botonAtras = document.querySelector('.controles .atras');
const botonAdelante = document.querySelector('.controles .adelante');

const volumen = document.getElementById("volumen");

const tiempoActual = document.querySelector("#tiempoActual");
const tiempoTotal = document.querySelector("#tiempoTotal");

const canciones = [
    {
        titulo:'Still With You',
        autor:'Jung Kook',
        fuente:'./musica/still_with_you.mp3'
    },
    {
        titulo:'Is This Love (2003 Remaster)',  
        autor:'Whitesnake',
        fuente:'./musica/is_this_love.mp3'
    },
    {
        titulo:'I Wanna Be Yours',
        autor:'Arctic Monkeys',
        fuente:'./musica/i_wanna_be_yours.mp3'
    }
];

let indiceCancionActual = Math.floor(Math.random() * canciones.length);


// volumen inicial
cancion.volume = volumen.value;

volumen.addEventListener("input", () => {
  cancion.volume = volumen.value;
});

function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    autorCancion.textContent = canciones[indiceCancionActual].autor;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata',function(){});
};

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
    tiempoTotal.textContent = formatTime(cancion.duration);
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion(){
    cancion.play();
    inconoControl.classList.add('fa-pause')
    inconoControl.classList.remove('fa-play')
}

function pausarCancion(){
    cancion.pause();
    inconoControl.classList.remove('fa-pause')
    inconoControl.classList.add('fa-play')
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
        tiempoActual.textContent = formatTime(cancion.currentTime);
    }
});

cancion.addEventListener("ended", () => {
  botonAdelante.click();
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

botonAdelante.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function(){
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();



const flechaReproductor = document.querySelector(".reproductor .cabecera");

flechaReproductor.addEventListener("click", () => {
    
    const cuerpoReproductor = document.querySelector(".reproductor .cuerpo");
    if (cuerpoReproductor.classList.contains('ocultar-reproductor')) {

        document.querySelector('.reproductor .cabecera .arrow').classList.remove('fa-caret-down');
        document.querySelector('.reproductor .cabecera .arrow').classList.add('fa-caret-up');
        cuerpoReproductor.classList.remove("ocultar-reproductor");
        cuerpoReproductor.classList.add("mostrar-reproductor");
    }else {
        document.querySelector('.reproductor .cabecera .arrow').classList.remove('fa-caret-up');
        document.querySelector('.reproductor .cabecera .arrow').classList.add('fa-caret-down');
        cuerpoReproductor.classList.remove("mostrar-reproductor");
        cuerpoReproductor.classList.add("ocultar-reproductor");
    }
    
});

function formatTime(time) {
  //if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}