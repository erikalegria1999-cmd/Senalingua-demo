let usuario = obtenerUsuario();
let ficha = localStorage.getItem("fichaActiva");
let aula = buscarAulaPorFicha(ficha);

function irPanelInstructor() {
    window.location.href = "instructor.html";
}

function crearCelda(texto) {
    let td = document.createElement("td");
    td.textContent = texto !== undefined && texto !== null ? texto : "--";
    return td;
}

function pintarFilaVacia(cuerpo) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");
    celda.colSpan = 7;
    celda.className = "vacio";
    celda.style.textAlign = "center";
    celda.style.color = "#64748b";
    celda.style.padding = "1.5rem";
    celda.textContent = "No apprentices enrolled in this classroom yet.";
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
}

function pintarBotonQuitar(id) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-primary";
    boton.style.backgroundColor = "#ef4444";
    boton.textContent = "Remove";
    boton.onclick = function () {
        quitarAprendiz(id);
    };
    return boton;
}

function pintarAprendices() {
    let cuerpo = document.getElementById("cuerpoAprendices");
    cuerpo.innerHTML = "";

    if (!aula.aprendices || aula.aprendices.length === 0) {
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
    document.getElementById("conteo").textContent = (aula.aprendices ? aula.aprendices.length : 0) + " apprentices";
    document.getElementById("fechaAula").textContent = aula.fecha || "--/--/----";

    let btnEstado = document.getElementById("btnEstado");
    if (aula.estado === "Activa") {
        btnEstado.textContent = "Active";
        btnEstado.className = "status-badge";
    } else {
        btnEstado.textContent = "Inactive";
        btnEstado.className = "status-badge inactivo";
    }

    pintarAprendices();
}

function quitarAprendiz(id) {
    Swal.fire({
        title: "Remove Apprentice?",
        text: "This action will unenroll the apprentice from this classroom.",
        icon: "warning",
        iconColor: "#ef4444",
        showCancelButton: true,
        confirmButtonText: "Yes, remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        background: "#ffffff",
        customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            htmlContainer: "custom-swal-text",
            confirmButton: "custom-swal-btn"
        },
        didOpen: (popup) => {
            popup.style.borderRadius = "20px";
        }
    }).then((result) => {
        if (result.isConfirmed) {
            aula.aprendices = aula.aprendices.filter(app => app.id !== id);
            actualizarAula(aula);
            pintarDetalle();

            Swal.fire({
                icon: "success",
                iconColor: "#00b86b",
                title: "Removed!",
                text: "The apprentice has been removed from the classroom.",
                confirmButtonText: "Got it",
                confirmButtonColor: "#00b86b",
                background: "#ffffff",
                didOpen: (popup) => {
                    popup.style.borderRadius = "20px";
                }
            });
        }
    });
}

function cambiarEstado() {
    aula.estado = aula.estado === "Activa" ? "Inactiva" : "Activa";
    actualizarAula(aula);
    pintarDetalle();
}

function guardarFecha() {
    let inputFecha = document.getElementById("nuevaFecha");
    let valor = inputFecha.value;

    if (!valor) return;

    aula.fecha = valor;
    actualizarAula(aula);
    document.getElementById("fechaAula").textContent = aula.fecha;
    
    let msgFecha = document.getElementById("msgFecha");
    msgFecha.classList.remove("oculto");

    setTimeout(() => {
        msgFecha.classList.add("oculto");
    }, 3000);

    inputFecha.value = "";
}

// Validación de sesión y rol
if (!usuario || usuario.rol !== "instructor") {
    window.location.href = "index.html";
} else if (!aula) {
    document.getElementById("detalleAula").classList.add("oculto");
    document.getElementById("sinAula").classList.remove("oculto");
} else {
    pintarDetalle();
}