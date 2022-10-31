package com.gesinsoft.gps.models;

import javax.persistence.Column;

//import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_plan;

    private String nombre_p;

    private Double costo_p;
    
    @Column(length = 10485760)
    private String imagen;

    private String descripcion_plan;

    private String estado_plan;

    private double p_costo_mensual;

    private Integer num_descripcion_p;

    //---------------------------
    //fk_gps
   @ManyToOne
   @JoinColumn(name = "id_modelo")
   private Modelo modelo;
   //------------------------------

    public Plan(String nombre_p, Double costo_p) {
        this.nombre_p = nombre_p;
        this.costo_p = costo_p;
    }

    Plan(){

    }

    public String getNombre_p() {
        return nombre_p;
    }

    public void setNombre_p(String nombre_p) {
        this.nombre_p = nombre_p;
    }

    public Double getCosto_p() {
        return costo_p;
    }

    public void setCosto_p(Double costo_p) {
        this.costo_p = costo_p;
    }

	public Modelo getModelo() {
		return modelo;
	}

	public void setModelo(Modelo modelo) {
		this.modelo = modelo;
	}

	public Long getId_plan() {
		return id_plan;
	}

	public void setId_plan(Long id_plan) {
		this.id_plan = id_plan;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

    public String getDescripcion_plan() {
        return descripcion_plan;
    }

    public void setDescripcion_plan(String descripcion_plan) {
        this.descripcion_plan = descripcion_plan;
    }

    public String getEstado_plan() {
        return estado_plan;
    }

    public void setEstado_plan(String estado_plan) {
        this.estado_plan = estado_plan;
    }

    public double getP_costo_mensual() {
        return p_costo_mensual;
    }

    public void setP_costo_mensual(double p_costo_mensual) {
        this.p_costo_mensual = p_costo_mensual;
    }

    public Integer getNum_descripcion_p() {
        return num_descripcion_p;
    }

    public void setNum_descripcion_p(Integer num_descripcion_p) {
        this.num_descripcion_p = num_descripcion_p;
    } 

    
   
}
