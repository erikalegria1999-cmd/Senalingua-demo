let usuario = obtenerUsuario();
let idLeccion = localStorage.getItem("leccionActual");
let datos = buscarLeccion(idLeccion);
let caja = document.getElementById("cajaLeccion");
let letras = ["A", "B", "C", "D"];
let paso = 0;
let aciertos = 0;

function pintarBotonVolver() {
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "boton verde";
    btn.textContent = "Back to dashboard";
    btn.onclick = function () {
        window.location.href = "aprendiz.html";
    };
    return btn;
}

function guardarResultado() {
    let total = datos.preguntas.length;
    let progreso = obtenerProgreso();

    if (progreso[idLeccion] != true) {
        usuario.puntos = usuario.puntos + (aciertos * 20);
        guardarUsuario(usuario);
        actualizarPuntosAprendiz(usuario.email, usuario.puntos);
    }

    progreso[idLeccion] = true;
    guardarProgreso(progreso);
    localStorage.setItem("puntaje-" + idLeccion, aciertos + "/" + total);
}

function pintarResultado() {
    guardarResultado();
    caja.innerHTML = "";

    let cajaResultado = document.createElement("div");
    cajaResultado.className = "resultado";

    let h2 = document.createElement("h2");
    h2.textContent = "Lesson complete";

    let p = document.createElement("p");
    p.className = "muted";
    p.textContent = datos.titulo;

    let score = document.createElement("p");
    score.className = "puntaje";
    score.textContent = aciertos + " / " + datos.preguntas.length;

    cajaResultado.appendChild(h2);
    cajaResultado.appendChild(p);
    cajaResultado.appendChild(score);
    cajaResultado.appendChild(pintarBotonVolver());
    caja.appendChild(cajaResultado);
}

function pintarOpciones(pregunta) {
    for (let i = 0; i < pregunta.o.length; i++) {
        let boton = document.createElement("button");
        boton.type = "button";
        boton.className = "opcion";
        boton.textContent = letras[i] + ". " + pregunta.o[i];

        let indice = i;
        boton.onclick = function () {
            if (indice == pregunta.c) {
                aciertos = aciertos + 1;
            }
            paso = paso + 1;
            pintarPregunta();
        };

        caja.appendChild(boton);
    }
}

function pintarPregunta() {
    if (paso >= datos.preguntas.length) {
        pintarResultado();
        return;
    }

    let pregunta = datos.preguntas[paso];
    caja.innerHTML = "";

    let pill = document.createElement("span");
    pill.className = "badge";
    pill.textContent = "Technical English · A1";

    let tituloLeccion = document.createElement("p");
    tituloLeccion.className = "muted";
    tituloLeccion.textContent = datos.titulo;

    let contador = document.createElement("p");
    contador.textContent = "Question " + (paso + 1) + " of " + datos.preguntas.length;

    let barra = document.createElement("div");
    barra.className = "barra";
    let relleno = document.createElement("div");
    relleno.className = "relleno";
    relleno.style.width = ((paso + 1) * 20) + "%";
    barra.appendChild(relleno);

    let titulo = document.createElement("h2");
    titulo.textContent = pregunta.q;

    caja.appendChild(pill);
    caja.appendChild(tituloLeccion);
    caja.appendChild(contador);
    caja.appendChild(barra);
    caja.appendChild(titulo);
    pintarOpciones(pregunta);
}

if (usuario == null || usuario.rol != "aprendiz") {
    window.location.href = "index.html";
} else if (datos == null) {
    caja.innerHTML = "<p>Lesson not found.</p>";
    caja.appendChild(pintarBotonVolver());
} else {
    pintarPregunta();
}
