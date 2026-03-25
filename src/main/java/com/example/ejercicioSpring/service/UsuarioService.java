package com.example.ejercicioSpring.service;

import com.example.ejercicioSpring.model.Usuario;
import com.example.ejercicioSpring.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> obtenerTodos(){
        return usuarioRepository.findAll();
    }

    public Usuario guardar (Usuario usuario){
        if (usuarioRepository.existsByNombre(usuario.getNombre())){
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        if (usuarioRepository.existsByEmail(usuario.getEmail())){
            throw new RuntimeException("El email ya esta registrado");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerPorId(Integer id){
        return usuarioRepository.findById(id).orElse(null);
    }

    public void eliminar (Integer id){
        usuarioRepository.deleteById(id);
    }

    public Usuario actualizar(Integer id, Usuario usuarioActualizado){
        Usuario usuario = usuarioRepository.findById(id).orElse(null);

        if(usuario != null){
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setEmail(usuarioActualizado.getEmail());

            return usuarioRepository.save(usuario);
        }
        return null;

    }

}
