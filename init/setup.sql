USE videojuegos;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS juegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    plataforma VARCHAR(50),
    genero VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    juego_id INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (juego_id) REFERENCES juegos(id),
    UNIQUE (usuario_id, juego_id) 
);


INSERT INTO usuarios (nombre, email) VALUES 
('Ruben', 'ruben@iesDeTeis.es'),
('David', 'david@iesDeTeis.es'),
('Juan', 'juan@iesDeTeis.es'),
('Noelia', 'noelia@iesDeTeis.es'),
('Natasha', 'natasha@iesDeTeis.es'),
('Candela', 'candela@iesDeTeis.es'),
('José', 'jose@iesDeTeis.es'),
('Lorena', 'lorena@iesDeTeis.es'),
('Castor', 'castor@iesDeTeis.es'),
('Ángel', 'angel@iesDeTeis.es'),
('Rafael', 'rafael@iesDeTeis.es'),
('Carolina', 'carolina@iesDeTeis.es'),
('Yelena', 'yelena@iesDeTeis.es'),
('Santiago', 'santiago@iesDeTeis.es'),
('Sergio', 'sergio@iesDeTeis.es'),
('Francisco', 'francisco@iesDeTeis.es'),
('Gabriel', 'gabriel@iesDeTeis.es');


INSERT INTO juegos (titulo, plataforma, genero) VALUES
('The Legend of Zelda: Breath of the Wild', 'Nintendo Switch', 'Aventura / Mundo Abierto'),
('Elden Ring', 'Multiplataforma', 'Rol / Acción'),
('Minecraft', 'Multiplataforma', 'Supervivencia / Construcción'),
('The Last of Us Part I', 'PlayStation 5', 'Acción / Drama'),
('Mario Kart 8 Deluxe', 'Nintendo Switch', 'Carreras'),
('Red Dead Redemption 2', 'Multiplataforma', 'Acción / Aventura'),
('Valorant', 'PC', 'Shooter Táctico');