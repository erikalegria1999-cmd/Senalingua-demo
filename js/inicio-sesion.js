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

            // Buscar coincidencia de credenciales
            const usuarioEncontrado = usuarios.find(
                u => u.correo.toLowerCase() === correo && u.clave === clave
            );

            if (!usuarioEncontrado) {
                Swal.fire({
                    icon: "error",
                    iconColor: "#ef4444",
                    title: "Authentication Error",
                    text: "Invalid email or password. Please try again.",
                    confirmButtonText: "Got it",
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
                });
                return;
            }

            // Guardar el usuario en la sesión activa
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

            // Evaluar si ya tiene rol guardado previamente
            if (usuarioEncontrado.rol) {
                // Redirección directa al panel correspondiente
                const destino = usuarioEncontrado.rol === "instructor" ? "instructor.html" : "aprendices.html";
                window.location.href = destino;
            } else {
                // Si es su primera vez, va a seleccionar el rol
                window.location.href = "seleccionar-rol.html";
            }
        });
    }
});