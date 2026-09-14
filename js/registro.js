document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("form-registro") || document.querySelector("form");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre")?.value.trim() || "Usuario SENA";
            const correo = document.getElementById("correo")?.value.trim();
            const clave = document.getElementById("clave")?.value || document.getElementById("password")?.value;
            const rolSelect = document.getElementById("rol")?.value || "aprendiz";

            if (!correo || !clave) {
                alert("Por favor completa los campos de correo y contraseña.");
                return;
            }

            // Obtener usuarios existentes
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Verificar si ya existe
            const usuarioExiste = usuarios.some(u => u.correo === correo);
            if (usuarioExiste) {
                alert("Este correo ya se encuentra registrado.");
                return;
            }

            // Crear el nuevo usuario con el esquema unificado
            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                rol: rolSelect,
                puntos: 0,
                racha: 1,
                codigo: "SENA-" + Math.floor(1000 + Math.random() * 9000)
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            window.location.href = "inicioSesion.html";
        });
    }
});