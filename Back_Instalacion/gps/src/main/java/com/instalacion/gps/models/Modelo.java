package com.instalacion.gps.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "modelo")
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_modelo;
    private  String nombre;
    private  String estado;

   //fk_gps
   @ManyToOne
   @JoinColumn(name = "id_gps")
   private Gps gps;
   
   //fk_acciones
   @OneToMany(mappedBy = "modelo")
   private List<Acciones> acciones;
   
   //fk_plan
   @OneToMany(mappedBy = "modelo")
   private List<Plan> plans;

    public Modelo(String nombre, String estado) {
        this.nombre = nombre;
        this.estado = estado;
    }
    public Modelo(){}
	public Long getId_modelo() {
		return id_modelo;
	}
	public void setId_modelo(Long id_modelo) {
		this.id_modelo = id_modelo;
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
    
    
}
