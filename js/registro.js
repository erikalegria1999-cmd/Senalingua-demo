document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("form-registro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombreInput = document.getElementById("nombre");
            const correoInput = document.getElementById("correo");
            const claveInput = document.getElementById("clave");

            const nombre = nombreInput.value.trim();
            const correo = correoInput.value.trim().toLowerCase();
            const clave = claveInput.value.trim();

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Validar si el correo ya existe
            const existe = usuarios.some(u => u.correo.toLowerCase() === correo);
            if (existe) {
                Swal.fire({
                    icon: "warning",
                    iconColor: "#00b86b",
                    title: "Email already registered",
                    text: "This email address is already associated with an account.",
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

            // Guardar usuario sin rol predeterminado
            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                racha: 1,
                puntos: 0
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Alerta de éxito con el diseño personalizado
            Swal.fire({
                icon: "success",
                iconColor: "#00b86b",
                title: "Account Created!",
                text: "Your account has been successfully created. Please log in to continue.",
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
            }).then(() => {
                window.location.href = "inicio-sesion.html";
            });
        });
    }
});