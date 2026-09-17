document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

    // Redirección si no ha iniciado sesión o no es instructor
    if (!usuarioLogueado || usuarioLogueado.rol !== "instructor") {
        window.location.href = "inicioSesion.html";
        return;
    }

    // Cargar nombres del usuario
    const elemNombreNav = document.getElementById("user-display-name");
    const elemNombreInstructor = document.getElementById("instructor-name");

    if (elemNombreNav) elemNombreNav.textContent = usuarioLogueado.nombre || "Instructor SENA";
    if (elemNombreInstructor) elemNombreInstructor.textContent = usuarioLogueado.nombre ? usuarioLogueado.nombre.split(" ")[0] : "Instructor";

    // Cargar foto de perfil en Navbar
    const contenedorFotoNav = document.getElementById("nav-profile-photo");
    cargarFotoPerfil(usuarioLogueado, contenedorFotoNav);

    // Cierre de sesión
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }

    // Alternar visibilidad del formulario de creación
    const btnToggleCreate = document.getElementById("btn-toggle-create");
    const btnCancelCreate = document.getElementById("btn-cancel-create");
    const cardCreateClassroom = document.getElementById("create-classroom-card");

    if (btnToggleCreate && cardCreateClassroom) {
        btnToggleCreate.addEventListener("click", () => {
            cardCreateClassroom.classList.toggle("oculto");
        });
    }

    if (btnCancelCreate && cardCreateClassroom) {
        btnCancelCreate.addEventListener("click", () => {
            cardCreateClassroom.classList.add("oculto");
        });
    }

    // Inicializar gestión de aulas
    cargarAulas();

    // Evento Formulario Crear Aula
    const formCreateClass = document.getElementById("form-create-class");
    if (formCreateClass) {
        formCreateClass.addEventListener("submit", (e) => {
            e.preventDefault();
            crearNuevaAula();
        });
    }
});

function cargarFotoPerfil(usuario, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const rutaImagen = usuario.foto_perfil || "img/instructor.png";

    const img = document.createElement("img");
    img.src = rutaImagen;
    img.alt = `Avatar de ${usuario.nombre || 'Instructor'}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    contenedor.appendChild(img);
}

// Carga e interactividad de la tabla de Aulas
function cargarAulas() {
    const tbody = document.getElementById("classrooms-tbody");
    if (!tbody) return;

    // Obtener aulas guardadas o usar las por defecto
    let aulas = JSON.parse(localStorage.getItem("aulas_sena")) || [
        {
            programa: "Análisis y Desarrollo de Software (ADSO)",
            ficha: "3312932",
            codigo: "ADSO331",
            aprendices: 21,
            fecha: "10/2/2026",
            estado: "Active"
        }
    ];

    tbody.innerHTML = "";

    aulas.forEach((aula, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${aula.programa}</td>
            <td>${aula.ficha}</td>
            <td><span class="code-badge">${aula.codigo}</span></td>
            <td>${aula.aprendices}</td>
            <td>${aula.fecha}</td>
            <td><span class="status-badge active">${aula.estado}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-table btn-view" onclick="verAprendices('${aula.ficha}')">View Apprentices</button>
                    <button class="btn-table btn-delete" onclick="eliminarAula(${index})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    actualizarEstadisticas(aulas);
}

function crearNuevaAula() {
    const fichaInput = document.getElementById("ficha-number");
    const programaInput = document.getElementById("programme-name");

    if (!fichaInput.value.trim() || !programaInput.value.trim()) return;

    let aulas = JSON.parse(localStorage.getItem("aulas_sena")) || [
        {
            programa: "Análisis y Desarrollo de Software (ADSO)",
            ficha: "3312932",
            codigo: "ADSO331",
            aprendices: 21,
            fecha: "10/2/2026",
            estado: "Active"
        }
    ];

    // Generar un código único combinando ADSO y últimos dígitos
    const codigoGenerado = "ADSO" + fichaInput.value.trim().slice(-3);
    const hoy = new Date();
    const fechaActual = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;

    const nuevaAula = {
        programa: programaInput.value.trim(),
        ficha: fichaInput.value.trim(),
        codigo: codigoGenerado,
        aprendices: 0,
        fecha: fechaActual,
        estado: "Active"
    };

    aulas.push(nuevaAula);
    localStorage.setItem("aulas_sena", JSON.stringify(aulas));

    fichaInput.value = "";
    document.getElementById("create-classroom-card").classList.add("oculto");

    cargarAulas();

    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: "Classroom Created!",
            text: `Access Code: ${codigoGenerado}`,
            icon: "success",
            confirmButtonColor: "#00b86b"
        });
    }
}

function eliminarAula(index) {
    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                procesarEliminacion(index);
            }
        });
    } else {
        if (confirm("Are you sure you want to delete this classroom?")) {
            procesarEliminacion(index);
        }
    }
}

function procesarEliminacion(index) {
    let aulas = JSON.parse(localStorage.getItem("aulas_sena")) || [];
    aulas.splice(index, 1);
    localStorage.setItem("aulas_sena", JSON.stringify(aulas));
    cargarAulas();
}

function actualizarEstadisticas(aulas) {
    const elemTotalClass = document.getElementById("total-classrooms");
    const elemTotalApp = document.getElementById("total-apprentices");
    const elemAvg = document.getElementById("avg-per-class");

    const totalAulas = aulas.length;
    const totalAprendices = aulas.reduce((acc, aula) => acc + Number(aula.aprendices), 0);
    const promedio = totalAulas > 0 ? Math.round(totalAprendices / totalAulas) : 0;

    if (elemTotalClass) elemTotalClass.textContent = totalAulas;
    if (elemTotalApp) elemTotalApp.textContent = totalAprendices;
    if (elemAvg) elemAvg.textContent = promedio;
}

function verAprendices(ficha) {
    if (typeof Swal !== "undefined") {
        Swal.fire({
            title: `Classroom Ficha: ${ficha}`,
            text: "Displaying apprentice list module...",
            icon: "info",
            confirmButtonColor: "#00b86b"
        });
    }
}