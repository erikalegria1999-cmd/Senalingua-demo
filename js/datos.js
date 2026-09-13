let aprendicesIniciales = [
    { id: "app1", nombre: "Jenny Carolina Marrugo Ussa", email: "jenny.marrugo@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app2", nombre: "Nicolás Ruiz Colorado", email: "nicolas.ruiz@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app3", nombre: "Erik Santiago Alegría Rojas", email: "erik.alegria@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app4", nombre: "Karen Niheidy Pastás Valencia", email: "karen.pastas@misena.edu.co", nivel: "A1", racha: 1, puntos: 0, actividad: "24/6/2026" },
    { id: "app5", nombre: "Jatniel Esneider Astudillo Benavides", email: "jatniel.astudillo@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app6", nombre: "Cristian David Yalanda Pillimue", email: "cristian.yalanda@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app7", nombre: "Óscar Santiago Castro Ayala", email: "oscar.castro@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app8", nombre: "Adriana Julieth Eraso Montero", email: "adriana.eraso@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app9", nombre: "Karen Vanessa Castañeda Morán", email: "karen.castaneda@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app10", nombre: "Sara Isabel Campo Calapsú", email: "sara.campo@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app11", nombre: "Samuel Santiago López Ruano", email: "samuel.lopez@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app12", nombre: "Astrith Katherine Benavides Imbachi", email: "astrith.benavides@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app13", nombre: "Emmanuel Bonilla Salazar", email: "emmanuel.bonilla@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app14", nombre: "Beckan Hungría Rodríguez", email: "beckan.hungria@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app15", nombre: "Sebastián Alejandro Bolaños Bolaños", email: "sebastian.bolanos@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app16", nombre: "Andrés Felipe Montano Bernal", email: "andres.montano@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app17", nombre: "Miguel Ángel Rivera Inchima", email: "miguel.rivera@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app18", nombre: "Luis Fernando Conejo Quiñones", email: "luis.conejo@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app19", nombre: "Andrea Melissa Eraso Montero", email: "andrea.eraso@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app20", nombre: "Cristian David Montilla Ordoñez", email: "cristian.montilla@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" },
    { id: "app21", nombre: "José David Ortega Golondrino", email: "jose.ortega@misena.edu.co", nivel: "A1", racha: 1, puntos: 300, actividad: "24/6/2026" }
];

let obtenerAulas = () => {
    let guardado = localStorage.getItem("aulas");

    if (guardado) {
        return JSON.parse(guardado);
    }

    let aulas = [{
        ficha: "3312932",
        programa: "Análisis y Desarrollo de Software (ADSO)",
        codigo: "ADSO331",
        fecha: "10/2/2026",
        estado: "Activa",
        aprendices: aprendicesIniciales
    }];

    localStorage.setItem("aulas", JSON.stringify(aulas));
    return aulas;
};

let guardarAulas = (aulas) => {
    localStorage.setItem("aulas", JSON.stringify(aulas));
};

let obtenerUsuario = () => {
    let guardado = localStorage.getItem("usuario");

    if (guardado) {
        return JSON.parse(guardado);
    }

    return null;
};

let guardarUsuario = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
};

let obtenerProgreso = () => {
    let guardado = localStorage.getItem("progreso");

    if (guardado) {
        return JSON.parse(guardado);
    }

    return {
        l1: false,
        l2: false,
        l3: false,
        l4: false
    };
};

let guardarProgreso = (progreso) => {
    localStorage.setItem("progreso", JSON.stringify(progreso));
};

let buscarAulaPorCodigo = (codigo) => {
    let aulas = obtenerAulas();

    for (let i = 0; i < aulas.length; i++) {
        if (aulas[i].codigo == codigo) {
            return aulas[i];
        }
    }

    return null;
};

let buscarAulaPorFicha = (ficha) => {
    let aulas = obtenerAulas();

    for (let i = 0; i < aulas.length; i++) {
        if (aulas[i].ficha == ficha) {
            return aulas[i];
        }
    }

    return null;
};

let lecciones = [
    {
        id: "l1",
        titulo: "Lesson 1.1 — Reading Interface Labels",
        preguntas: [
            { q: "In a login form, the label Username refers to:", o: ["The user's password", "The identifier used to authenticate an account", "The server hostname", "The display name"], c: 1 },
            { q: "You hear: Click Save to store your changes. What should you do?", o: ["Close without saving", "Select Save to persist your modifications", "Restart the computer", "Disable auto-save"], c: 1 },
            { q: "A teammate asks: Did you restart the IDE? Which response is clearest?", o: ["Maybe.", "Yes, I restarted Visual Studio Code after installing the extension.", "IDE.", "I think so."], c: 1 },
            { q: "Choose the best label for a button that submits a registration form:", o: ["Go", "Submit Registration", "Press", "Cancel"], c: 1 },
            { q: "An error states: File not found. This means:", o: ["The requested file does not exist at the specified path", "The internet connection failed", "The keyboard is disconnected", "The file was moved"], c: 0 }
        ]
    },
    {
        id: "l2",
        titulo: "Lesson 1.2 — Basic Error Messages",
        preguntas: [
            { q: "Connection refused typically indicates:", o: ["The target service is not accepting connections", "The monitor is turned off", "The code compiled successfully", "The user cancelled"], c: 0 },
            { q: "You hear: Open the terminal and run npm install. First step?", o: ["Open the command-line terminal", "Delete node_modules", "Send an email", "Run as administrator"], c: 0 },
            { q: "How do you politely ask for help with an installation error?", o: ["Fix it.", "Could you help me review this installation error?", "Error.", "Help me now."], c: 1 },
            { q: "Select the clearest folder name for a frontend project:", o: ["stuff", "frontend-app", "aaa", "myProject"], c: 1 },
            { q: "You hear: The build failed. What happened?", o: ["The build process did not complete successfully", "The project was deployed", "All tests passed", "The build completed"], c: 0 }
        ]
    },
    {
        id: "l3",
        titulo: "Lesson 2.1 — Git Terminology",
        preguntas: [
            { q: "In Git, a commit is:", o: ["A saved snapshot of changes", "A type of virus", "An email", "A command that deletes branches"], c: 0 },
            { q: "You hear: Stage your changes before committing. What should you do?", o: ["Use git add to prepare changes", "Delete the repository", "Rename the branch", "Commit without reviewing"], c: 0 },
            { q: "Which phrase describes cloning a repository?", o: ["I cloned the remote repository to my local machine.", "I cloned the keyboard.", "Clone is done maybe.", "I downloaded Git."], c: 0 },
            { q: "Best commit message for adding a README file:", o: ["update", "docs: add project README with setup instructions", "asdf", "wip"], c: 1 },
            { q: "Branch in Git refers to:", o: ["An independent line of development", "A hardware component", "A CSS property", "A network cable"], c: 0 }
        ]
    },
    {
        id: "l4",
        titulo: "Lesson 2.2 — Basic Git Operations",
        preguntas: [
            { q: "git status shows:", o: ["The current state of the working directory", "The weather", "CPU temperature", "All contributors"], c: 0 },
            { q: "You hear: Push your commits to the remote. What does this mean?", o: ["Upload local commits to the remote repository", "Remove all commits", "Format the hard drive", "Download commits"], c: 0 },
            { q: "During stand-up, how do you report Git progress?", o: ["I did Git.", "I created a feature branch and pushed two commits for the login form.", "Branches.", "I used version control."], c: 1 },
            { q: "Select the appropriate PR title:", o: ["changes", "feat: add user login form validation", "???", "fix bug"], c: 1 },
            { q: "You hear: There is a merge conflict in app.js. What is required?", o: ["Manually resolve conflicting changes", "Ignore the conflict", "Uninstall Git", "Wait 24 hours"], c: 0 }
        ]
    }
];

let buscarLeccion = (id) => {
    for (let i = 0; i < lecciones.length; i++) {
        if (lecciones[i].id == id) {
            return lecciones[i];
        }
    }

    return null;
};

function irInicio() {
    window.location.href = "index.html";
}

function irPanelInstructor() {
    window.location.href = "instructor.html";
}

function irPanelAprendiz() {
    window.location.href = "aprendiz.html";
}

function cerrarSesion() {
    window.location.href = "index.html";
}

function primerNombre(nombre) {
    let partes = nombre.split(" ");
    return partes[0];
}

function iniciales(nombre) {
    let partes = nombre.split(" ");
    let letras = "";

    if (partes.length > 0) {
        letras = letras + partes[0].charAt(0);
    }

    if (partes.length > 1) {
        letras = letras + partes[1].charAt(0);
    }

    return letras;
}

function actualizarAula(aula) {
    let aulas = obtenerAulas();

    for (let i = 0; i < aulas.length; i++) {
        if (aulas[i].ficha == aula.ficha) {
            aulas[i] = aula;
        }
    }

    guardarAulas(aulas);
}

function actualizarPuntosAprendiz(email, puntos) {
    let aulas = obtenerAulas();

    for (let i = 0; i < aulas.length; i++) {
        for (let j = 0; j < aulas[i].aprendices.length; j++) {
            if (aulas[i].aprendices[j].email == email) {
                aulas[i].aprendices[j].puntos = puntos;
            }
        }
    }

    guardarAulas(aulas);
}

function crearCelda(texto) {
    let td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function mostrarMensaje(id, texto) {
    let caja = document.getElementById(id);
    caja.textContent = texto;
    caja.classList.remove("oculto");
}

function ocultarMensaje(id) {
    let caja = document.getElementById(id);
    caja.classList.add("oculto");
}
