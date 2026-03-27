const API_USUARIOS = "http://209.97.178.50:8080/usuarios";

async function cargarUsuarios() {
    const contenedor = document.getElementById("usuarios");
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    contenedor.innerHTML = "<p>Cargando usuarios...</p>";

    try {
        const response = await fetch(API_USUARIOS);

        if (!response.ok) {
            throw new Error("No se pudieron cargar los usuarios");
        }

        const usuarios = await response.json();
        contenedor.innerHTML = "";

        if (usuarios.length === 0) {
            contenedor.innerHTML = "<p>No hay usuarios disponibles.</p>";
            return;
        }

        usuarios.forEach(usuario => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${usuario.nombre ?? "Sin nombre"}</h3>
                <p><strong>Email:</strong> ${usuario.email ?? "Sin email"}</p>
                <p><strong>ID:</strong> ${usuario.id}</p>
                <div class="acciones">
                    <button onclick="cargarUsuarioParaEditar(${usuario.id})">Editar</button>
                    <button class="danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </div>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar los usuarios.</p>";
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

document.getElementById("usuarioForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("usuarioId").value;
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    mensaje.className = "mensaje";

    const usuario = {
        nombre,
        email
    };

    try {
        let response;

        if (id) {
            response = await fetch(`${API_USUARIOS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        } else {
            response = await fetch(API_USUARIOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        if (!response.ok) {
            const textoError = await response.text();
            throw new Error(textoError || "Error al guardar el usuario");
        }

        mensaje.textContent = id ? "Usuario actualizado correctamente" : "Usuario creado correctamente";
        mensaje.className = "mensaje ok";

        limpiarFormularioUsuario();
        cargarUsuarios();

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
});

async function cargarUsuarioParaEditar(id) {
    const mensaje = document.getElementById("mensaje");

    try {
        const response = await fetch(`${API_USUARIOS}/${id}`);

        if (!response.ok) {
            throw new Error("No se pudo cargar el usuario");
        }

        const usuario = await response.json();

        document.getElementById("usuarioId").value = usuario.id ?? "";
        document.getElementById("nombre").value = usuario.nombre ?? "";
        document.getElementById("email").value = usuario.email ?? "";

        mensaje.textContent = "Usuario cargado para editar";
        mensaje.className = "mensaje ok";

        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

async function eliminarUsuario(id) {
    const mensaje = document.getElementById("mensaje");
    const confirmar = confirm("¿Seguro que quieres eliminar este usuario?");

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${API_USUARIOS}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar el usuario");
        }

        mensaje.textContent = "Usuario eliminado correctamente";
        mensaje.className = "mensaje ok";

        cargarUsuarios();

    } catch (error) {
        mensaje.textContent = error.message;
        mensaje.className = "mensaje error";
        console.error(error);
    }
}

function limpiarFormularioUsuario() {
    document.getElementById("usuarioId").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
}
