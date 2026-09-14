document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login") || document.querySelector("form");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const correoInput = document.getElementById("email") || document.getElementById("correo");
            const claveInput = document.getElementById("password") || document.getElementById("clave");

            if (!correoInput || !claveInput) {
                alert("Error: no se encontraron los campos del formulario.");
                return;
            }

            const correo = correoInput.value.trim();
            const clave = claveInput.value.trim();

            if (!correo || !clave) {
                alert("Por favor ingrese correo y contraseña.");
                return;
            }

            // Cargar lista de usuarios desde localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Buscar coincidencia exacta
            const usuarioValido = usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave);

            if (usuarioValido) {
                // Guardar la sesión activa para el resto del sistema
                localStorage.setItem("usuario", JSON.stringify(usuarioValido));

                alert(`¡Bienvenido de nuevo, ${usuarioValido.nombre}!`);

                // Redireccionar según el rol registrado
                if (usuarioValido.rol === "instructor") {
                    window.location.href = "instructor.html";
                } else {
                    window.location.href = "aprendiz.html";
                }
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});