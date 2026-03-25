package com.example.ejercicioSpring.controller;


import com.example.ejercicioSpring.model.Juego;
import com.example.ejercicioSpring.model.Usuario;
import com.example.ejercicioSpring.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> obtenerTodos(){
        return usuarioService.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<?> crear (@RequestBody Usuario usuario){
        try {
            Usuario nuevoUsuario = usuarioService.guardar(usuario);
            return  ResponseEntity.ok(nuevoUsuario);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Integer id){
        return usuarioService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable Integer id){
        usuarioService.eliminar(id);
    }

    @PutMapping("/{id}")
    public Usuario actulizar (@PathVariable Integer id, @RequestBody Usuario usuarioActualizado){
        return usuarioService.actualizar(id, usuarioActualizado);
    }

    @PatchMapping("/{id}")
    public Usuario actualizarParcial(@PathVariable Integer id, @RequestBody Usuario emailActualizado) {
        return usuarioService.actualizar(id,emailActualizado);
    }




















}

