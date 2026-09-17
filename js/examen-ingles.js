document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioActivo || usuarioActivo.rol !== "aprendiz") {
        window.location.href = "index.html";
        return;
    }

    // Preguntas técnicas para la evaluación
    const preguntas = [
        {
            pregunta: "1. Which command is used to display output in JavaScript?",
            opciones: ["console.log()", "print()", "echo()", "System.out.println()"],
            correcta: 0
        },
        {
            pregunta: "2. Complete the sentence: 'An API ________ frontend and backend systems.'",
            opciones: ["connects", "connecting", "connected", "connect"],
            correcta: 0
        },
        {
            pregunta: "3. What is the meaning of 'Merge Request' or 'Pull Request'?",
            opciones: [
                "Deleting a repository",
                "A proposal to integrate code changes into a branch",
                "Downloading a database",
                "A server hardware failure"
            ],
            correcta: 1
        },
        {
            pregunta: "4. Identify the correct passive voice sentence:",
            opciones: [
                "The server fixed the developer.",
                "The bug was fixed by the developer.",
                "Developer fixing the bug fast.",
                "The bug fixes the developer."
            ],
            correcta: 1
        },
        {
            pregunta: "5. Choose the correct conditional statement:",
            opciones: [
                "If the test fails, we will debug the code.",
                "If the test fail, we debugged code.",
                "If the test failing, we will debug code.",
                "If test will fail, we debug."
            ],
            correcta: 0
        }
    ];

    let indiceActual = 0;
    let puntaje = 0;

    const questionContainer = document.getElementById("questionContainer");
    const stepIndicator = document.getElementById("stepIndicator");
    const progressFill = document.getElementById("progressFill");
    const btnNext = document.getElementById("btnNext");

    function renderizarPregunta() {
        const q = preguntas[indiceActual];
        stepIndicator.textContent = `Question ${indiceActual + 1} of ${preguntas.length}`;
        progressFill.style.width = `${((indiceActual + 1) / preguntas.length) * 100}%`;

        let html = `<h2 class="question-text">${q.pregunta}</h2><div class="options-grid">`;

        q.opciones.forEach((opcion, i) => {
            html += `
                <label class="option-card">
                    <input type="radio" name="opcion" value="${i}">
                    <span class="option-text">${opcion}</span>
                </label>
            `;
        });

        html += `</div>`;
        questionContainer.innerHTML = html;
    }

    btnNext.addEventListener("click", () => {
        const seleccion = document.querySelector('input[name="opcion"]:checked');

        if (!seleccion) {
            Swal.fire({
                icon: "warning",
                title: "Selection Required",
                text: "Please select an answer to continue.",
                confirmButtonColor: "#00b86b"
            });
            return;
        }

        if (parseInt(seleccion.value) === preguntas[indiceActual].correcta) {
            puntaje++;
        }

        indiceActual++;

        if (indiceActual < preguntas.length) {
            renderizarPregunta();
        } else {
            finalizarExamen();
        }
    });

    function finalizarExamen() {
        let nivelCalculado = "A1 Beginner";
        if (puntaje >= 4) {
            nivelCalculado = "B1 Intermediate";
        } else if (puntaje >= 2) {
            nivelCalculado = "A2 Elementary";
        }

        // Actualizar usuario en LocalStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarioActivo.nivel = nivelCalculado;
        usuarioActivo.puntos = puntaje * 20;

        const index = usuarios.findIndex(u => u.correo.toLowerCase() === usuarioActivo.correo.toLowerCase());
        if (index !== -1) {
            usuarios[index] = usuarioActivo;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
        localStorage.setItem("usuario", JSON.stringify(usuarioActivo));

        Swal.fire({
            icon: "success",
            iconColor: "#00b86b",
            title: "Assessment Completed!",
            text: `Based on your results, your assigned level is ${nivelCalculado}.`,
            confirmButtonText: "Go to Student Dashboard",
            confirmButtonColor: "#00b86b"
        }).then(() => {
            window.location.href = "aprendiz.html";
        });
    }

    renderizarPregunta();
});