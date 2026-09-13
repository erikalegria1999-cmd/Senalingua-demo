let usuario = obtenerUsuario();

function pintarKpis(aulas) {
    let totalAprendices = 0;

    for (let i = 0; i < aulas.length; i++) {
        totalAprendices = totalAprendices + aulas[i].aprendices.length;
    }

    document.getElementById("kpiAulas").textContent = aulas.length;
    document.getElementById("kpiAprendices").textContent = totalAprendices;

    if (aulas.length > 0) {
        document.getElementById("kpiPromedio").textContent = Math.round(totalAprendices / aulas.length);
    } else {
        document.getElementById("kpiPromedio").textContent = 0;
    }
}

function pintarFilaVacia(cuerpo) {
    let fila = document.createElement("tr");
    let celda = document.createElement("td");
    celda.colSpan = 7;
    celda.className = "vacio";
    celda.textContent = "No classrooms yet. Create one to get started.";
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
}

function pintarBotonEstado(aula) {
    let boton = document.createElement("button");
    boton.type = "button";
    boton.className = "estado";

    if (aula.estado == "Activa") {
        boton.textContent = "Active";
    } else {
        boton.textContent = "Inactive";
        boton.classList.add("inactiva");
    }

    let ficha = aula.ficha;
    boton.onclick = function () {
        cambiarEstado(ficha);
    };

    return boton;
}

function pintarBotonesAccion(aula) {
    let caja = document.createElement("div");
    caja.className = "acciones";

    let btnVer = document.createElement("button");
    btnVer.type = "button";
    btnVer.className = "boton blanco";
    btnVer.textContent = "View Apprentices";
    let fichaVer = aula.ficha;
    btnVer.onclick = function () {
        verAprendices(fichaVer);
    };

    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "boton rojo";
    btnBorrar.textContent = "Delete";
    let fichaBorrar = aula.ficha;
    btnBorrar.onclick = function () {
        eliminarAula(fichaBorrar);
    };

    caja.appendChild(btnVer);
    caja.appendChild(btnBorrar);
    return caja;
}

function pintarAulas() {
    let aulas = obtenerAulas();
    let cuerpo = document.getElementById("cuerpoAulas");
    cuerpo.innerHTML = "";

    if (aulas.length == 0) {
        pintarFilaVacia(cuerpo);
    } else {
        for (let i = 0; i < aulas.length; i++) {
            let aula = aulas[i];
            let fila = document.createElement("tr");

            fila.appendChild(crearCelda(aula.programa));
            fila.appendChild(crearCelda(aula.ficha));

            let tdCodigo = document.createElement("td");
            tdCodigo.innerHTML = "<span class='codigo'>" + aula.codigo + "</span>";
            fila.appendChild(tdCodigo);

            fila.appendChild(crearCelda(aula.aprendices.length));
            fila.appendChild(crearCelda(aula.fecha));

            let tdEstado = document.createElement("td");
            tdEstado.appendChild(pintarBotonEstado(aula));
            fila.appendChild(tdEstado);

            let tdAccion = document.createElement("td");
            tdAccion.appendChild(pintarBotonesAccion(aula));
            fila.appendChild(tdAccion);

            cuerpo.appendChild(fila);
        }
    }

    pintarKpis(aulas);
}

function abrirModal() {
    document.getElementById("modal").classList.remove("oculto");
}

function cerrarModal() {
    document.getElementById("modal").classList.add("oculto");
    ocultarMensaje("errorCrear");
}

function crearAula() {
    let ficha = document.getElementById("nuevaFicha").value;
    let programa = document.getElementById("nuevoPrograma").value;
    let aulas = obtenerAulas();

    if (ficha == "") {
        mostrarMensaje("errorCrear", "Ficha number is required.");
    } else if (programa == "") {
        mostrarMensaje("errorCrear", "Programme is required.");
    } else {
        let existe = false;

        for (let i = 0; i < aulas.length; i++) {
            if (aulas[i].ficha == ficha) {
                existe = true;
            }
        }

        if (existe == true) {
            mostrarMensaje("errorCrear", "A classroom with this ficha already exists.");
        } else {
            aulas.push({
                ficha: ficha,
                programa: programa,
                codigo: "ADSO" + ficha,
                fecha: "13/9/2026",
                estado: "Activa",
                aprendices: []
            });

            guardarAulas(aulas);
            document.getElementById("nuevaFicha").value = "";
            cerrarModal();
            pintarAulas();
        }
    }
}

function cambiarEstado(ficha) {
    let aulas = obtenerAulas();

    for (let i = 0; i < aulas.length; i++) {
        if (aulas[i].ficha == ficha) {
            if (aulas[i].estado == "Activa") {
                aulas[i].estado = "Inactiva";
            } else {
                aulas[i].estado = "Activa";
            }
        }
    }

    guardarAulas(aulas);
    pintarAulas();
}

function verAprendices(ficha) {
    localStorage.setItem("fichaActiva", ficha);
    window.location.href = "aprendices.html";
}

function eliminarAula(ficha) {
    let ok = confirm("Are you sure you want to delete this classroom?");

    if (ok == true) {
        let aulas = obtenerAulas();
        let restantes = [];

        for (let i = 0; i < aulas.length; i++) {
            if (aulas[i].ficha != ficha) {
                restantes.push(aulas[i]);
            }
        }

        guardarAulas(restantes);
        pintarAulas();
    }
}

if (usuario == null || usuario.rol != "instructor") {
    window.location.href = "index.html";
} else {
    document.getElementById("nombreInstructor").textContent = usuario.nombre;
    pintarAulas();
}
