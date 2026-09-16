document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogueado || usuarioLogueado.rol !== "aprendiz") {
        window.location.href = "inicioSesion.html";
        return;
    }

    actualizarInterfaz(usuarioLogueado);

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }

    const formEnrolment = document.getElementById("form-enrolment");
    const errorEnrolment = document.getElementById("enrolment-error");

    if (formEnrolment) {
        formEnrolment.addEventListener("submit", (e) => {
            e.preventDefault();
            const classCodeInput = document.getElementById("class-code");
            const codigoAula = classCodeInput.value.trim().toUpperCase();

            if (!codigoAula) return;

            if (codigoAula === "ADSO331") {
                if (errorEnrolment) errorEnrolment.classList.add("oculto");
                alert(`¡Te has unido exitosamente al aula ${codigoAula}!`);
                const rankDisplay = document.getElementById("rank-display");
                if (rankDisplay) rankDisplay.textContent = "#5";
                classCodeInput.value = "";
            } else {
                if (errorEnrolment) {
                    errorEnrolment.textContent = "Código de aula inválido o inactivo.";
                    errorEnrolment.classList.remove("oculto");
                }
            }
        });
    }
});

function actualizarInterfaz(usuario) {
    const primerNombre = usuario.nombre ? usuario.nombre.split(" ")[0] : "Aprendiz";

    const elemNombreNav = document.getElementById("user-display-name");
    const elemNombreHero = document.getElementById("welcome-name");
    const elemRacha = document.getElementById("streak-count");
    const elemPuntos = document.getElementById("points-count");
    const elemRango = document.getElementById("rank-display");
    const elemProgreso = document.getElementById("progress-percent");

    if (elemNombreNav) elemNombreNav.textContent = usuario.nombre || "Aprendiz SENA";
    if (elemNombreHero) elemNombreHero.textContent = primerNombre;
    if (elemRacha) elemRacha.textContent = usuario.racha || 0;
    if (elemPuntos) elemPuntos.textContent = usuario.puntos || 0;
    if (elemRango) elemRango.textContent = "—";
    if (elemProgreso) elemProgreso.textContent = "0%";

    const contenedorFotoNav = document.getElementById("nav-profile-photo");
    const contenedorFotoBienvenida = document.getElementById("welcome-profile-photo");

    cargarFotoPerfil(usuario, contenedorFotoNav);
    cargarFotoPerfil(usuario, contenedorFotoBienvenida);
}


function cargarFotoPerfil(usuario, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    // 1. Determinar el fallback según el rol
    const fotoDefault = usuario.rol === "instructor" ? "img/instructor.png" : "img/apprentice.png";
        // 2. Usar la foto guardada o el fallback correcto
    const rutaImagen = usuario.foto_perfil || usuario.foto || fotoDefault;
    // 3. Crear el elemento <img>
    const img = document.createElement("img");
    img.src = rutaImagen;
    img.alt = `Avatar de ${usuario.nombre || 'Usuario'}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    // 4. Fallback si la ruta en localStorage estuviera rota
    img.onerror = function() {
        if (!this.dataset.triedFallback) {
            this.dataset.triedFallback = "true";
            this.src = fotoDefault;
        }
    };

    contenedor.appendChild(img);
}