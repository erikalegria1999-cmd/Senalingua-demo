let usuario = obtenerUsuario();
let ficha = localStorage.getItem("fichaActiva");
let aula = buscarAulaPorFicha(ficha);

function pintarFilaVacia(cuerpo) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");
    celda.colSpan = 7;
    celda.className = "vacio";
    celda.textContent = "No apprentices enrolled in this classroom yet.";
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
}

function pintarBotonQuitar(id) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton rojo";
    boton.textContent = "Remove";
    boton.onclick = function () {
        quitarAprendiz(id);
    };
    return boton;
}

function pintarAprendices() {
    let cuerpo = document.getElementById("cuerpoAprendices");
    cuerpo.innerHTML = "";

    if (aula.aprendices.length == 0) {
        pintarFilaVacia(cuerpo);
    } else {
        for (let i = 0; i < aula.aprendices.length; i++) {
            let app = aula.aprendices[i];
            let fila = document.createElement("tr");

            fila.appendChild(crearCelda(app.nombre));
            fila.appendChild(crearCelda(app.email));
            fila.appendChild(crearCelda(app.nivel));
            fila.appendChild(crearCelda(app.racha));
            fila.appendChild(crearCelda(app.puntos));
            fila.appendChild(crearCelda(app.actividad));

            let tdAccion = document.createElement("td");
            tdAccion.appendChild(pintarBotonQuitar(app.id));
            fila.appendChild(tdAccion);

            cuerpo.appendChild(fila);
        }
    }
}

function pintarDetalle() {
    document.getElementById("tituloPrograma").textContent = aula.programa;
    document.getElementById("pillFicha").textContent = "Enrolled Apprentices · Ficha " + aula.ficha;
    document.getElementById("codigoAula").textContent = aula.codigo;
    document.getElementById("conteo").textContent = aula.aprendices.length + " apprentices";
    document.getElementById("fechaAula").textContent = aula.fecha;

    let btnEstado = document.getElementById("btnEstado");
    if (aula.estado == "Activa") {
        btnEstado.textContent = "Active";
        btnEstado.className = "estado";
    } else {
        btnEstado.textContent = "Inactive";
        btnEstado.className = "estado inactiva";
    }

    pintarAprendices();
}

function quitarAprendiz(id) {
    let confirma = confirm("Remove this apprentice from the classroom?");

    if (confirma == true) {
        let restantes = [];

        for (let i = 0; i < aula.aprendices.length; i++) {
            if (aula.aprendices[i].id != id) {
                restantes.push(aula.aprendices[i]);
            }
        }

        aula.aprendices = restantes;
        actualizarAula(aula);
        pintarDetalle();
    }
}

function cambiarEstado() {
    if (aula.estado == "Activa") {
        aula.estado = "Inactiva";
    } else {
        aula.estado = "Activa";
    }

    actualizarAula(aula);
    pintarDetalle();
}

function guardarFecha() {
    let valor = document.getElementById("nuevaFecha").value;

    if (valor == "") {
        return;
    }

    aula.fecha = valor;
    actualizarAula(aula);
    document.getElementById("fechaAula").textContent = aula.fecha;
    document.getElementById("msgFecha").classList.remove("oculto");
}

if (usuario == null || usuario.rol != "instructor") {
    window.location.href = "index.html";
} else if (aula == null) {
    document.getElementById("detalleAula").classList.add("oculto");
    document.getElementById("sinAula").classList.remove("oculto");
} else {
    pintarDetalle();
}
