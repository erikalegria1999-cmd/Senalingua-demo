function irAprendiz() {
}

function irInstructor() {
    let usuario = obtenerUsuario();

    if (usuario == null || usuario.rol != "instructor") {
        usuario = {
            rol: "instructor",
            nombre: "Yoly Alexandra Guevara Muñoz",
            email: "yoly.guevara@sena.edu.co"
        };
    }

    usuario.rol = "instructor";
    guardarUsuario(usuario);
    window.location.href = "instructor.html";
}
