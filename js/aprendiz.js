
let usuario = obtenerUsuario();

function leccionTerminada(id) {
    let progreso = obtenerProgreso();
    return progreso[id] === true;
}

function leccionLibre(id) {
    if (id === "l1") {
        return true;
    }
    if (id === "l2" && leccionTerminada("l1") === true) {
        return true;
    }
    if (id === "l3" && leccionTerminada("l2") === true) {
        return true;
    }
    if (id === "l4" && leccionTerminada("l3") === true) {
        return true;
    }
    return false;
}

function calcularProgreso() {
    let hechas = 0;
    let ids = ["l1", "l2", "l3", "l4"];

    for (let i = 0; i < ids.length; i++) {
        if (leccionTerminada(ids[i]) === true) {
            hechas += 1;
        }
    }

    return hechas * 25;
}

function calcularRango(aula) {
    let puesto = 1;

    for (let i = 0; i < aula.aprendices.length; i++) {
        if (aula.aprendices[i].email !== usuario.email) {
            if (aula.aprendices[i].puntos > usuario.puntos) {
                puesto += 1;
            }
        }
    }

    return "#" + puesto;
}

function pintarPerfil() {
    document.getElementById("avatar").textContent = iniciales(usuario.nombre);
    document.getElementById("nombreChip").textContent = usuario.nombre;
    document.getElementById("nivelChip").textContent = "CEFR A1";
    document.getElementById("bienvenida").textContent = "Welcome, " + primerNombre(usuario.nombre);
    document.getElementById("perfilNombre").value = usuario.nombre;
    document.getElementById("perfilEmail").value = usuario.email;
}

function pintarEstadisticas() {
    let progreso = calcularProgreso();
    let rango = "—";
    let aula = null;

    if (usuario.codigo && usuario.codigo !== "") {
        aula = buscarAulaPorCodigo(usuario.codigo);
    }

    if (aula !== null) {
        rango = calcularRango(aula);
    }

    document.getElementById("porcentaje").textContent = progreso + "%";
    document.getElementById("rellenoProgreso").style.width = progreso + "%";
    document.getElementById("statRacha").textContent = usuario.racha;
    document.getElementById("statPuntos").textContent = usuario.puntos;
    document.getElementById("statRango").textContent = rango;
    document.getElementById("statProgreso").textContent = progreso + "%";
}

function pintarAula() {
    let aula = null;

    if (usuario.codigo && usuario.codigo !== "") {
        aula = buscarAulaPorCodigo(usuario.codigo);
    }

    if (aula === null) {
        document.getElementById("cajaUnir").classList.remove("oculto");
        document.getElementById("cajaAula").classList.add("oculto");
    } else {
        document.getElementById("cajaUnir").classList.add("oculto");
        document.getElementById("cajaAula").classList.remove("oculto");
        document.getElementById("codigoInscrito").textContent = aula.codigo;
        document.getElementById("fechaAula").textContent = aula.fecha;

        let estado = document.getElementById("estadoAula");
        if (aula.estado === "Activa") {
            estado.textContent = "Active";
            estado.className = "estado";
        } else {
            estado.textContent = "Inactive";
            estado.className = "estado inactiva";
        }
    }

    pintarEstadisticas();
}

function pintarBotonLeccion(leccion) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton verde";
    boton.textContent = "Start";

    let idLeccion = leccion.id;
    boton.onclick = function () {
        localStorage.setItem("leccionActual", idLeccion);
        window.location.href = "leccion.html";
    };

    return boton;
}

function pintarLeccion(leccion, caja) {
    let fila = document.createElement("div");
    fila.className = "leccion";

    let info = document.createElement("div");
    info.className = "leccion-info";

    let titulo = document.createElement("strong");
    titulo.textContent = leccion.titulo;

    let texto = document.createElement("p");
    texto.className = "muted";
    texto.textContent = "5 questions";

    info.appendChild(titulo);
    info.appendChild(texto);
    fila.appendChild(info);

    if (leccionTerminada(leccion.id) === true) {
        let puntaje = document.createElement("span");
        puntaje.className = "puntaje";
        puntaje.textContent = localStorage.getItem("puntaje-" + leccion.id);
        fila.appendChild(puntaje);
    } else if (leccionLibre(leccion.id) === true) {
        fila.appendChild(pintarBotonLeccion(leccion));
    } else {
        let bloqueada = document.createElement("span");
        bloqueada.className = "muted";
        bloqueada.textContent = "Locked";
        fila.appendChild(bloqueada);
    }

    caja.appendChild(fila);
}

function pintarModulo(numero, titulo, leccionA, leccionB) {
    let modulo = document.createElement("div");
    modulo.className = "tarjeta";

    let cabeza = document.createElement("div");
    cabeza.className = "modulo-cabeza";

    let indice = document.createElement("span");
    indice.className = "modulo-numero";
    indice.textContent = "0" + numero;

    let h3 = document.createElement("h3");
    h3.textContent = titulo;

    cabeza.appendChild(indice);
    cabeza.appendChild(h3);
    modulo.appendChild(cabeza);

    pintarLeccion(leccionA, modulo);
    pintarLeccion(leccionB, modulo);

    return modulo;
}

function pintarModulos() {
    let lista = document.getElementById("listaModulos");
    lista.innerHTML = "";
    lista.appendChild(pintarModulo(1, "Interface English", lecciones[0], lecciones[1]));
    lista.appendChild(pintarModulo(2, "Git English", lecciones[2], lecciones[3]));
}

function abrirPerfil() {
    document.getElementById("fondoPerfil").classList.remove("oculto");
}

function cerrarPerfil() {
    document.getElementById("fondoPerfil").classList.add("oculto");
    if (typeof ocultarMensaje === "function") {
        ocultarMensaje("msgGuardado");
    } else {
        document.getElementById("msgGuardado").classList.add("oculto");
    }
}

function guardarPerfil() {
    let nombre = document.getElementById("perfilNombre").value.trim();
    let email = document.getElementById("perfilEmail").value.trim();

    if (nombre === "" || email === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Information',
            text: 'Please fill in all profile fields before saving.',
            confirmButtonColor: '#28a745'
        });
        return;
    }

    usuario.nombre = nombre;
    usuario.email = email;
    guardarUsuario(usuario);
    document.getElementById("msgGuardado").classList.remove("oculto");
    pintarPerfil();
}


 
function unirse() {
    let inputCodigo = document.getElementById("codigoAula");
    let codigo = inputCodigo.value.trim().toUpperCase();

    // 1. Validación de campo vacío
    if (codigo === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Code',
            text: 'Please enter a valid classroom access code.',
            confirmButtonColor: '#00324D',
            customClass: {
                popup: 'swal2-border-radius'
            }
        });
        return;
    }

    let aula = buscarAulaPorCodigo(codigo);

    
    if (aula === null) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Access Code',
            text: `The code "${codigo}" does not exist in our records. Please verify it with your instructor.`,
            confirmButtonColor: '#e74c3c',
            footer: '<strong>SENALingua System Notification</strong>'
        });
        return;
    }

    
    if (aula.estado !== "Activa") {
        Swal.fire({
            icon: 'info',
            title: 'Classroom Inactive',
            text: 'This classroom is currently closed or inactive. Contact your instructor for further details.',
            confirmButtonColor: '#f39c12'
        });
        return;
    }


    let yaEsta = false;

    for (let i = 0; i < aula.aprendices.length; i++) {
        if (aula.aprendices[i].email === usuario.email) {
            yaEsta = true;
            break;
        }
    }

    if (!yaEsta) {
        aula.aprendices.push({
            id: "appNuevo",
            nombre: usuario.nombre,
            email: usuario.email,
            nivel: "A1",
            racha: usuario.racha,
            puntos: usuario.puntos,
            actividad: new Date().toLocaleDateString('es-CO')
        });
        actualizarAula(aula);
    }

    usuario.codigo = aula.codigo;
    guardarUsuario(usuario);
    inputCodigo.value = "";

    Swal.fire({
        icon: 'success',
        title: 'Enrolled Successfully!',
        text: `You have joined classroom ${aula.codigo}.`,
        confirmButtonColor: '#28a745',
        timer: 2500,
        showConfirmButton: false
    });

    pintarAula();
}

if (usuario === null || usuario.rol !== "aprendiz") {
    window.location.href = "index.html";
} else {
    document.addEventListener("DOMContentLoaded", function () {
        pintarPerfil();
        pintarAula();
        pintarModulos();

        // Permite presionar Enter en el campo de código de aula
        let inputCodigo = document.getElementById("codigoAula");
        if (inputCodigo) {
            inputCodigo.addEventListener("keyup", function (event) {
                if (event.key === "Enter") {
                    unirse();
                }
            });
        }
    });
}
