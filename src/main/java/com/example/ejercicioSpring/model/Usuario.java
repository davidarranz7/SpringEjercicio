package com.example.ejercicioSpring.model;


import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String email;

    @Column(name = "creado_en", insertable = false, updatable = false)
    private LocalDateTime creado_en;


    public Usuario() {
    }

    public Usuario(Integer id, String nombre, String email, LocalDateTime creado_en) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.creado_en = creado_en;
    }

    public Usuario(String nombre, String email, LocalDateTime creado_en) {
        this.nombre = nombre;
        this.email = email;
        this.creado_en = creado_en;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreado_en() {
        return creado_en;
    }

    public void setCreado_en(LocalDateTime creado_en) {
        this.creado_en = creado_en;
    }
}
