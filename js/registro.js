document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("form-registro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombreInput = document.getElementById("nombre");
            const correoInput = document.getElementById("correo");
            const claveInput = document.getElementById("clave");
            const rolInput = document.getElementById("rol");

            const nombre = nombreInput.value.trim();
            const correo = correoInput.value.trim().toLowerCase();
            const clave = claveInput.value.trim();
            const rol = rolInput.value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const existe = usuarios.some(u => u.correo.toLowerCase() === correo);
            if (existe){
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    iconColor: "#00b464",
                    title: "<span style='color:#00B86B; font-family:sans-serif;'>Este correo ya está registrado</span>",
                    background: " #ffffff",
                    showConfirmButton: false,
                    timer: 1500,
                    didOpen: (popup) => {
                        popup.style.borderRadius = '30px';
                    }      
                });
                return;
            }
            // Asignación de foto según el rol
            const fotoPerfil = rol === "instructor" ? "img/instructor.png" : "img/aprendiz.png";

            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                rol: rol,
                foto_perfil: fotoPerfil,
                racha: 1,
                puntos: 0
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            Swal.fire({
                position: "top-center",
                icon: "success",
                iconColor: "#00b464",
                title: "<span style='color:#009854; font-family:sans-serif;'>¡Cuenta creada exitosamente!</span>",
                showConfirmButton: false,
                timer: 2000,
                didOpen: (popup) => {
                        popup.style.borderRadius = '30px';
                    }      
                });            
            

        });
    }
});