package com.example.ejercicioSpring.service;

import com.example.ejercicioSpring.model.Juego;
import com.example.ejercicioSpring.repository.JuegoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JuegoService{

    private final JuegoRepository juegoRepository;

    public JuegoService(JuegoRepository juegoRepository) {
        this.juegoRepository = juegoRepository;
    }

    public List<Juego> obtenerTodos(){
        return juegoRepository.findAll();
    }

    public Juego guardar(Juego juego){
        if (juegoRepository.existsByTitulo(juego.getTitulo())) {
            throw new RuntimeException("El titulo");
        }

        return juegoRepository.save(juego);
    }

    public Juego obtenerPorId (Integer id){
        return juegoRepository.findById(id).orElse(null);
    }

    public void eliminar(Integer id){
        juegoRepository.deleteById(id);
    }

    public Juego actualizar (Integer id, Juego juegoActualizado){

        Juego juego = juegoRepository.findById(id).orElse(null);

        if (juego != null){
            juego.setTitulo(juegoActualizado.getTitulo());
            juego.setPlataforma(juegoActualizado.getPlataforma());
            juego.setGenero(juegoActualizado.getGenero());

            return juegoRepository.save(juego);
        }
            return null;
    }
    public Juego actualizarParcial(Integer id, Juego juegoParcial) {
        Juego juegoExistente = juegoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        // Solo actualizamos si no es null
        if (juegoParcial.getTitulo() != null) {
            juegoExistente.setTitulo(juegoParcial.getTitulo());
        }

        if (juegoParcial.getGenero() != null) {
            juegoExistente.setGenero(juegoParcial.getGenero());
        }

        // añade aquí más campos si tienes

        return juegoRepository.save(juegoExistente);
    }

}
