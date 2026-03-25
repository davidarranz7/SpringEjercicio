package com.example.ejercicioSpring.service;

import com.example.ejercicioSpring.model.Juego;
import com.example.ejercicioSpring.model.Resena;
import com.example.ejercicioSpring.model.Usuario;
import com.example.ejercicioSpring.repository.JuegoRepository;
import com.example.ejercicioSpring.repository.ResenaRepository;
import com.example.ejercicioSpring.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final UsuarioRepository usuarioRepository;
    private final JuegoRepository juegoRepository;


    public ResenaService(ResenaRepository resenaRepository, UsuarioRepository usuarioRepository, JuegoRepository juegoRepository) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
        this.juegoRepository = juegoRepository;
    }

    public List<Resena> obtenerTodas(){
        return resenaRepository.findAll();
    }


    public Resena crear(Resena resena) {
        Usuario usuario = usuarioRepository.findById(resena.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Juego juego = juegoRepository.findById(resena.getJuego().getId())
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        resena.setUsuario(usuario);
        resena.setJuego(juego);

        return resenaRepository.save(resena);
    }

    public Resena obtenerPorId(Integer id){
        return resenaRepository.findById(id).orElse(null);
    }

    public void eliminar (Integer id){
        resenaRepository.deleteById(id);
    }

    public Resena actualizar (Integer id,Resena resenaActualizada){

        Resena resena = resenaRepository.findById(id).orElse(null);

        if (resena != null){
            resena.setComentario(resenaActualizada.getComentario());

            return resenaRepository.save(resena);
        }
        return null;
    }
}

