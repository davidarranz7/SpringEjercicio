package com.example.ejercicioSpring.repository;

import com.example.ejercicioSpring.model.Juego;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JuegoRepository extends JpaRepository<Juego,Integer> {

    boolean existsByTitulo(String titulo);
}
