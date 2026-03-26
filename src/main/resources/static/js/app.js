const API_URL = "/juegos";

async function cargarJuegos() {
    const contenedor = document.getElementById("juegos");
    contenedor.innerHTML = "<p>Cargando juegos...</p>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("No se pudieron cargar los juegos");
        }

        const juegos = await response.json();
        contenedor.innerHTML = "";

        if (juegos.length === 0) {
            contenedor.innerHTML = "<p>No hay juegos guardados.</p>";
            return;
        }

        juegos.forEach(juego => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${juego.titulo}</h3>
                <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
                <p><strong>Género:</strong> ${juego.genero}</p>
                <p><strong>ID:</strong> ${juego.id}</p>
                <div class="card-buttons">
                    <button onclick="editarJuego(${juego.id})">Editar</button>
                    <button class="danger" onclick="eliminarJuego(${juego.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar los juegos.</p>";
        console.error(error);
        mostrarMensaje("Error al cargar los juegos", true);
    }
}

document.getElementById("juegoForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("juegoId").value;
    const titulo = document.getElementById("titulo").value.trim();
    const plataforma = document.getElementById("plataforma").value.trim();
    const genero = document.getElementById("genero").value.trim();

    const juego = {
        titulo,
        plataforma,
        genero
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(juego)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(juego)
            });
        }

        if (!response.ok) {
            const errorTexto = await response.text();
            throw new Error(errorTexto || "Error al guardar el juego");
        }

        mostrarMensaje(id ? "Juego actualizado correctamente" : "Juego añadido correctamente");
        limpiarFormulario();
        cargarJuegos();

    } catch (error) {
        console.error(error);
        mostrarMensaje(error.message || "Error al guardar el juego", true);
    }
});

async function eliminarJuego(id) {
    const confirmado = confirm("¿Seguro que quieres eliminar este juego?");

    if (!confirmado) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el juego");
        }

        mostrarMensaje("Juego eliminado correctamente");
        cargarJuegos();

    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al eliminar el juego", true);
    }
}

async function editarJuego(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("No se pudo cargar el juego");
        }

        const juego = await response.json();

        document.getElementById("juegoId").value = juego.id;
        document.getElementById("titulo").value = juego.titulo || "";
        document.getElementById("plataforma").value = juego.plataforma || "";
        document.getElementById("genero").value = juego.genero || "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        mostrarMensaje("Juego cargado para editar");

    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al cargar el juego para editar", true);
    }
}

function limpiarFormulario() {
    document.getElementById("juegoId").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("plataforma").value = "";
    document.getElementById("genero").value = "";
}

function mostrarMensaje(texto, esError = false) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;
    mensaje.className = esError ? "mensaje error" : "mensaje ok";

    setTimeout(() => {
        mensaje.textContent = "";
        mensaje.className = "";
    }, 3000);
}