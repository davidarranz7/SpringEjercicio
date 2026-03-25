async function cargarJuegos() {
    const contenedor = document.getElementById("juegos");
    contenedor.innerHTML = "Cargando...";

    try {
        const response = await fetch("/juegos");
        const juegos = await response.json();

        contenedor.innerHTML = "";

        juegos.forEach(juego => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${juego.nombre}</h3>
                <p>ID: ${juego.id}</p>
            `;

            contenedor.appendChild(card);
        });

    } catch (error) {
        contenedor.innerHTML = "Error al cargar los juegos";
        console.error(error);
    }
}