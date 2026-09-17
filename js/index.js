const botonCreate = document.querySelector("#btn-createAccount");
const botonLogin = document.querySelector("#btn-logIn");

if (botonCreate) {
    botonCreate.addEventListener("click", (e) => {
            window.location.href = "registro.html"; 
    });
} else {
    console.error("No se encontró el botón #btn-createAccount");
}

if (botonLogin) {
    botonLogin.addEventListener("click", (e) => {
        // Corregido a 'inicio-sesion.html' para coincidir con el nombre de tu archivo HTML
        e.preventDefault();
        window.location.href = "inicio-sesion.html";
    });
} else {
    console.error("No se encontró el botón #btn-logIn");
}