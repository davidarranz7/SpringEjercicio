package com.example.ejercicioSpring.repository;

import com.example.ejercicioSpring.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    boolean existsByNombre(String nombre);
    boolean existsByEmail(String email);
}
