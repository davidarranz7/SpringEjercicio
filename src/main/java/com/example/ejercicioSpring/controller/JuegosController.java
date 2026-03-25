package com.example.ejercicioSpring.controller;

import com.example.ejercicioSpring.model.Juego;
import com.example.ejercicioSpring.service.JuegoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/juegos")
public class JuegosController {

    private final JuegoService juegoService;

    public JuegosController(JuegoService juegoService) {
        this.juegoService = juegoService;
    }

    @GetMapping
    public List<Juego> obtenerTodos(){
        return  juegoService.obtenerTodos();
    }

    @PostMapping
    public ResponseEntity<?> crear (@RequestBody Juego juego){
        try{
            Juego nuevoJuego = juegoService.guardar(juego);
            return ResponseEntity.ok(nuevoJuego);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Juego obtenerPorId (@PathVariable Integer id){
        return juegoService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        juegoService.eliminar(id);
    }

    @PutMapping("/{id}")
    public Juego actualizar(@PathVariable Integer id, @RequestBody Juego juegoActualizado) {
        return juegoService.actualizar(id,juegoActualizado);
    }

    @PatchMapping("/{id}")
    public Juego actualizarParcial(@PathVariable Integer id, @RequestBody Juego juegoParcial) {
        return juegoService.actualizarParcial(id, juegoParcial);
    }




}
