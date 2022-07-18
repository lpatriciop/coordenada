package com.instalacion.gps.models;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "acciones")
public class Acciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_acciones;
    private  String nombre;
    private  String estado;
    
    //fk_modelo
   @ManyToOne
   @JoinColumn(name = "id_modelo")
   private Modelo modelo;
   
    public Acciones(String nombre, String estado) {
        this.nombre = nombre;
        this.estado = estado;
    }
    public Acciones() {
    }
    public Long getId_acciones() {
        return id_acciones;
    }
    public void setId_acciones(Long id_acciones) {
        this.id_acciones = id_acciones;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
	public Modelo getModelo() {
		return modelo;
	}
	public void setModelo(Modelo modelo) {
		this.modelo = modelo;
	}
    
}
