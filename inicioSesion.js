// ----- Funciones para guardar y leer usuarios en localStorage -----

function obtenerUsuarios() {
    let datos = localStorage.getItem("usuarios");

    if (datos == null) {
        return [];
    } else {
        return JSON.parse(datos);
    }
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// ----- Registro -----

function registrar() {
    let correo = document.getElementById("registro-email").value;
    let clave = document.getElementById("registro-password").value;
    let mensaje = document.getElementById("mensaje-registro");

    if (correo == "" || clave == "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    let usuarios = obtenerUsuarios();
    let existe = false;

    for (let i = 0; i < usuarios.length; i = i + 1) {
        if (usuarios[i].correo == correo) {
            existe = true;
        }
    }

    if (existe) {
        mensaje.textContent = "Ese correo ya está registrado.";
        mensaje.style.color = "red";
    } else {
        let nuevoUsuario = {
            correo: correo,
            clave: clave
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        mensaje.textContent = "Cuenta creada con éxito.";
        mensaje.style.color = "green";
        document.getElementById("form-registro").reset();
    }
}

// ----- Inicio de sesión -----

function iniciarSesion() {
    let correo = document.getElementById("login-email").value;
    let clave = document.getElementById("login-password").value;
    let mensaje = document.getElementById("mensaje-login");

    if (correo == "" || clave == "") {
        mensaje.textContent = "Ingresa tu correo y contraseña.";
        mensaje.style.color = "red";
        return;
    }

    let usuarios = obtenerUsuarios();
    let encontrado = null;

    for (let i = 0; i < usuarios.length; i = i + 1) {
        if (usuarios[i].correo == correo && usuarios[i].clave == clave) {
            encontrado = usuarios[i];
        }
    }

    if (encontrado == null) {
        mensaje.textContent = "Correo o contraseña incorrectos.";
        mensaje.style.color = "red";
    } else {
        mensaje.textContent = "¡Bienvenido de nuevo!";
        mensaje.style.color = "green";
    }
}

// ----- Cambiar entre login y registro -----

function cambiarFormulario() {
    document.getElementById("login-view").classList.toggle("oculto");
    document.getElementById("register-view").classList.toggle("oculto");
}

// ----- Eventos -----

document.getElementById("btn-login").addEventListener("click", iniciarSesion);
document.getElementById("btn-registro").addEventListener("click", registrar);
document.getElementById("ir-registro").addEventListener("click", cambiarFormulario);
document.getElementById("ir-login").addEventListener("click", cambiarFormulario);