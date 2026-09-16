document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("email");
            const passwordInput = document.getElementById("password");

            const correo = emailInput.value.trim().toLowerCase();
            const clave = passwordInput.value.trim();

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioEncontrado = usuarios.find(
                u => u.correo.toLowerCase() === correo && u.clave === clave
            );

            if (!usuarioEncontrado) {
                Swal.fire({
                    title: "¡Algo salio mal!",
                    text: "Correo o contraseña incorrectos",
                    icon: "error",
                    iconColor:"#00B86B",
                    showConfirmButton:false,
                    timer:2500,
                    timerProgressBar:true
                });
                return;
            }

            // asegurar que tenga la propiedad foto_perfil asignada
            if (!usuarioEncontrado.foto_perfil) {
                usuarioEncontrado.foto_perfil = usuarioEncontrado.rol === "instructor" ? "img/instructor.png" : "img/aprendiz.png";
            }

            // guardar usuario activo en sesión
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

            // redirección según rol
            if (usuarioEncontrado.rol === "instructor") {
                window.location.href = "instructor.html";
            } else {
                window.location.href = "aprendiz.html";
            }
        });
    }
});