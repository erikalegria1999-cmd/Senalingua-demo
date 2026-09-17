document.addEventListener("DOMContentLoaded", () => {
    // Validar si existe una sesión activa
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioActivo) {
        window.location.href = "inicio-sesion.html";
        return;
    }

    // Si por alguna razón ya tenía rol, redirigir automáticamente
    if (usuarioActivo.rol) {
        const destino = usuarioActivo.rol === "instructor" ? "instructor.html" : "aprendices.html";
        window.location.href = destino;
        return;
    }

    const btnAprendiz = document.getElementById("btn-role-aprendiz");
    const btnInstructor = document.getElementById("btn-role-instructor");

    if (btnAprendiz) {
        btnAprendiz.addEventListener("click", () => seleccionarRol("aprendiz"));
    }

    if (btnInstructor) {
        btnInstructor.addEventListener("click", () => seleccionarRol("instructor"));
    }
});

function seleccionarRol(rolElegido) {
    let usuarioActivo = JSON.parse(localStorage.getItem("usuario"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!usuarioActivo) {
        window.location.href = "inicio-sesion.html";
        return;
    }

    // Definir rol e imagen de perfil
    usuarioActivo.rol = rolElegido;
    usuarioActivo.foto_perfil = rolElegido === "instructor" ? "img/instructor.png" : "img/aprendiz.png";

    // Actualizar usuario en el listado general
    const index = usuarios.findIndex(u => u.correo.toLowerCase() === usuarioActivo.correo.toLowerCase());
    if (index !== -1) {
        usuarios[index] = usuarioActivo;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Actualizar usuario activo en sesión
    localStorage.setItem("usuario", JSON.stringify(usuarioActivo));

    // Confirmación y redirección
    Swal.fire({
        icon: "success",
        iconColor: "#00b86b",
        title: "Role Saved!",
        text: `Your profile has been configured as ${rolElegido.toUpperCase()}.`,
        confirmButtonText: "Go to Dashboard",
        confirmButtonColor: "#00b86b",
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
    }).then(() => {
        const destino = rolElegido === "instructor" ? "instructor.html" : "aprendices.html";
        window.location.href = destino;
    });
    // Cambiar el destino según el rol
const destino = rolElegido === "instructor" ? "instructor.html" : "examen-ingles.html";
window.location.href = destino;
}
