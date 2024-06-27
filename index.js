const eleccionesUsuario = [];
const eleccionesComputadora = [];
const seleccionJugador = document.getElementById("jugador");
const seleccionComputadora = document.getElementById("maquina");
const botones = document.querySelectorAll(".btn");
const ganados = document.getElementById("ganados");
const empates = document.getElementById("empates");
const perdidos = document.getElementById("perdidos");

let contadorPerdidos = 0;
let contadorGanados = 0;
let contadorEmpates = 0;
let contadorRondas = 0;

const nombreUsuario = window.localStorage.getItem('username');

function dormir(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
} 

const seleccionComputadoraAleatoria = () => {
    let seleccion;
    const probabilidad = Math.floor(Math.random() * 10) + 1;
    console.log("Probabilidad Computadora:", probabilidad);
    if (probabilidad > 7) {
        seleccion = "r";
        seleccionComputadora.innerHTML = "✊";
    } else if (probabilidad < 5) {
        seleccion = "p";
        seleccionComputadora.innerHTML = "👋";
    } else {
        seleccion = "s";
        seleccionComputadora.innerHTML = "✌️";
    };
    eleccionesComputadora.push(seleccion);
}

const seleccionUsuario = () => {
    seleccionComputadoraAleatoria();
    comparar(eleccionesUsuario[0], eleccionesComputadora[0]);
    eleccionesUsuario.shift();
    eleccionesComputadora.shift();
};

async function seleccionarAleatorio() {
    let opciones = ["✊", "👋", "✌️"];
    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            seleccionComputadora.innerHTML = opciones[x];
            await dormir(80);
        };
    }
}

function comparar(usuario, computadora) {
    const respuesta = document.getElementById('ronda-actual')
    if (usuario === "r" && computadora === "r") {
        respuesta.innerHTML = "¡Fue un empate!";
        contadorEmpates = contadorEmpates + 1;
        empates.innerHTML = contadorEmpates;
    } else if (usuario === "p" && computadora === "p") {
        respuesta.innerHTML = "¡Fue un empate!";
        contadorEmpates = contadorEmpates + 1;
        empates.innerHTML = contadorEmpates;
    } else if (usuario === "s" && computadora === "s") {
        respuesta.innerHTML = "¡Fue un empate!";
        contadorEmpates = contadorEmpates + 1;
        empates.innerHTML = contadorEmpates;
    }
    if (usuario === "r" && computadora === "s") {
        respuesta.innerHTML = `¡Ganó <bold>${nombreUsuario}</bold> con Piedra!`;
        contadorGanados = contadorGanados + 1;
        ganados.innerHTML = contadorGanados;
    } else if (usuario === "s" && computadora === "p") {
        respuesta.innerHTML = `¡Ganó <bold>${nombreUsuario}</bold> con Tijeras!`;
        contadorGanados = contadorGanados + 1;
        ganados.innerHTML = contadorGanados;
    } else if (usuario === "p" && computadora === "r") {
        respuesta.innerHTML = `¡Ganó <bold>${nombreUsuario}</bold> con Papel!`;
        contadorGanados = contadorGanados + 1;
        ganados.innerHTML = contadorGanados;
    }
    if (usuario === "s" && computadora === "r") {
        respuesta.innerHTML = "¡Ganó <bold>Máquina</bold> con Piedra!";
        contadorPerdidos = contadorPerdidos + 1;
        perdidos.innerHTML = contadorPerdidos;
    } else if (usuario === "p" && computadora === "s") {
        respuesta.innerHTML = "¡Ganó <bold>Máquina</bold> con Tijeras!";
        contadorPerdidos = contadorPerdidos + 1;
        perdidos.innerHTML = contadorPerdidos;
    } else if (usuario === "r" && computadora === "p") {
        respuesta.innerHTML = "¡Ganó <bold>Máquina</bold> con Papel!";
        contadorPerdidos = contadorPerdidos + 1;
        perdidos.innerHTML = contadorPerdidos;
    }
}

const nombre = document.querySelector('code');

nombre.addEventListener('click', e => {
    document.querySelector("#contenedor").style.opacity = 0;
    document.querySelector("#entrada-carta").style.display = "block";
});

document.querySelector("#enviar-nick").addEventListener('click', e => {
    e.preventDefault();
    window.localStorage.setItem('username', document.querySelector("#nuevo-nick").value);
    document.querySelector("#nombre-usuario").innerHTML = document.querySelector("#nuevo-nick").value;
    document.querySelector("#contenedor").style.opacity = 1;
    document.querySelector("#entrada-carta").style.display = "none";
});

if (nombreUsuario == null){
    window.localStorage.setItem('username', "Jugador");
}

document.querySelector("#nombre-usuario").innerHTML = window.localStorage.getItem('username');

botones.forEach(button => {
    button.addEventListener('click', async e => {
        e.preventDefault(); 
        if (button.name === "piedra") {
            eleccionesUsuario.push("r");
            seleccionJugador.innerHTML = "✊"
        } 

        if (button.name === "tijeras") { 
            eleccionesUsuario.push("s");
            seleccionJugador.innerHTML = "✌️"
        } 

        if (button.name === "papel") {
            eleccionesUsuario.push("p");
            seleccionJugador.innerHTML = "👋"
        }
        await seleccionarAleatorio();
        contadorRondas = contadorRondas + 1;
        document.getElementById("rondas").innerHTML = contadorRondas;
        perdidos.innerHTML = contadorPerdidos;
        seleccionUsuario();
    });
});
