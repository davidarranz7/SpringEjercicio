package com.example.ejercicioSpring.controller;


import com.example.ejercicioSpring.model.Juego;
import com.example.ejercicioSpring.model.Resena;
import com.example.ejercicioSpring.repository.JuegoRepository;
import com.example.ejercicioSpring.repository.UsuarioRepository;
import com.example.ejercicioSpring.service.JuegoService;
import com.example.ejercicioSpring.service.ResenaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resenas")
public class ResenaController {

    private final ResenaService resenaService;
    private final UsuarioRepository usuarioRepository;
    private final JuegoRepository juegoRepository;

    public ResenaController(ResenaService resenaService, UsuarioRepository usuarioRepository, JuegoRepository juegoRepository) {
        this.resenaService = resenaService;
        this.usuarioRepository = usuarioRepository;
        this.juegoRepository = juegoRepository;
    }

    @GetMapping
    public List<Resena> obtenrTodos(){
        return resenaService.obtenerTodas();
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Resena resena) {
        try {
            return ResponseEntity.ok(resenaService.crear(resena));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Resena obtenerPorId (@PathVariable Integer id){
        return resenaService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        resenaService.eliminar(id);
    }

    @PutMapping("/{id}")
    public Resena actualizar(@PathVariable Integer id, @RequestBody Resena resenaActualizada) {
        return resenaService.actualizar(id,resenaActualizada);
    }



































}
