document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogueado || usuarioLogueado.rol !== "instructor") {
        window.location.href = "inicioSesion.html";
        return;
    }

    const elemNombreNav = document.getElementById("user-display-name");
    const elemNombreInstructor = document.getElementById("instructor-name");

    if (elemNombreNav) elemNombreNav.textContent = usuarioLogueado.nombre || "Instructor SENA";
    if (elemNombreInstructor) elemNombreInstructor.textContent = usuarioLogueado.nombre ? usuarioLogueado.nombre.split(" ")[0] : "Instructor";

    const contenedorFotoNav = document.getElementById("nav-profile-photo");
    cargarFotoPerfil(usuarioLogueado, contenedorFotoNav);

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }

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
});

function cargarFotoPerfil(usuario, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    const rutaImagen = usuario.foto_perfil || (usuario.rol === "instructor" ? "img/instructor.png" : "img/aprendiz.png");

    const img = document.createElement("img");
    img.src = rutaImagen;
    img.alt = `Avatar de ${usuario.nombre}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "50%";

    contenedor.appendChild(img);
}