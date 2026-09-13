let empleados = [];

const guardar = () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let nuevoEmpleado = {
        email: email.value,
        password: password.value
    };

    let listaExistente = JSON.parse(localStorage.getItem('empleados'));
    if (listaExistente !== null) {
        empleados = listaExistente;
    }

    empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(empleados));

    alert('Empleado guardado correctamente');
    window.location.href = 'inicio.html';
};