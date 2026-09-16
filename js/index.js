let botonCreate = document.querySelector("#btn-createAccount");
let botonLogin = document.querySelector("#btn-logIn");

if (botonCreate) {
    botonCreate.addEventListener("click", (e) => {
        e.preventDefault(); 
        window.location.href = "registro.html"; 
    });
} else {
    console.error("No se encontró el botón #btn-createAccount");
}

if (botonLogin) {
    botonLogin.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "inicioSesion.html";
    });
} else {
    console.error("No se encontró el botón #btn-logIn");
}