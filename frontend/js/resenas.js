const API_RESENAS = "http://209.97.178.50:8080/resenas";

async function cargarResenas() {
    const contenedor = document.getElementById("resenas");
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    contenedor.innerHTML = "<p>Cargando reseñas...</p>";

    try {
        const response = await fetch(API_RESENAS);

        if (!response.ok) {
            throw new Error("No se pudieron cargar las reseñas");
        }

        const resenas = await response.json();
        contenedor.innerHTML = "";

        if (resenas.length === 0) {
            contenedor.innerHTML = "<p>No hay reseñas disponibles.</p>";
            return;
        }

        resenas.forEach(resena => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>Reseña #${resena.id}</h3>
                <p><strong>Comentario:</strong> ${resena.comentario ?? "Sin comentario"}</p>
                <p><strong>ID Usuario:</strong> ${resena.usuario?.id ?? "N/A"}</p>
                <p><strong>ID Juego:</strong> ${resena.juego?.id ?? "N/A"}</p>
                <div class="acciones">
                    <button onclick="cargarResenaParaEditar(${resena.id})">Editar</button>
                    <button class="danger" onclick="eliminarResena(${resena.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar las reseñas.</p>";
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

document.getElementById("resenaForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("resenaId").value;
    const comentario = document.getElementById("comentario").value.trim();
    const usuarioId = parseInt(document.getElementById("usuarioId").value);
    const juegoId = parseInt(document.getElementById("juegoId").value);
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    mensaje.className = "mensaje";

    const resena = {
        comentario,
        usuario: { id: usuarioId },
        juego: { id: juegoId }
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_RESENAS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resena)
            });
        } else {
            response = await fetch(API_RESENAS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resena)
            });
        }

        if (!response.ok) {
            const textoError = await response.text();
            throw new Error(textoError || "Error al guardar la reseña");
        }

        mensaje.textContent = id ? "Reseña actualizada correctamente" : "Reseña creada correctamente";
        mensaje.className = "mensaje ok";

        limpiarFormularioResena();
        cargarResenas();

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
});

async function cargarResenaParaEditar(id) {
    const mensaje = document.getElementById("mensaje");

    try {
        const response = await fetch(`${API_RESENAS}/${id}`);

        if (!response.ok) {
            throw new Error("No se pudo cargar la reseña");
        }

        const resena = await response.json();

        document.getElementById("resenaId").value = resena.id ?? "";
        document.getElementById("comentario").value = resena.comentario ?? "";
        document.getElementById("usuarioId").value = resena.usuario?.id ?? "";
        document.getElementById("juegoId").value = resena.juego?.id ?? "";

        mensaje.textContent = "Reseña cargada para editar";
        mensaje.className = "mensaje ok";

        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

async function eliminarResena(id) {
    const mensaje = document.getElementById("mensaje");
    const confirmar = confirm("¿Seguro que quieres eliminar esta reseña?");

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${API_RESENAS}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar la reseña");
        }

        mensaje.textContent = "Reseña eliminada correctamente";
        mensaje.className = "mensaje ok";

        cargarResenas();

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

function limpiarFormularioResena() {
    document.getElementById("resenaId").value = "";
    document.getElementById("comentario").value = "";
    document.getElementById("usuarioId").value = "";
    document.getElementById("juegoId").value = "";
}
