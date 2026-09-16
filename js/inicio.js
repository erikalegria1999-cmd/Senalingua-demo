function irAprendiz() {
    let usuario = obtenerUsuario();

    if (usuario == null || usuario.rol != "aprendiz") {
        usuario = {
            rol: "aprendiz",
            nombre: "Karen Niheidy Pastás Valencia",
            email: "karen.pastas@misena.edu.co",
            codigo: "",
            nivel: "A1",
            puntos: 0,
            racha: 1
        };
    }

    usuario.rol = "aprendiz";
    guardarUsuario(usuario);
    window.location.href = "aprendiz.html";
}

function irInstructor() {
}
 