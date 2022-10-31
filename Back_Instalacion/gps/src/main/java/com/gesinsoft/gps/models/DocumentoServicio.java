package com.gesinsoft.gps.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "documentoservicio")
public class DocumentoServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_documentoservicio;


    private Date fecha_ds;

    private String hora;

    private Date fecha_inicion;

    private Date fecha_fin;
    
    private String Estado;
    
    private double costo;

    private double costo_plan;

    private Date fecha_fin_plan;

    private String tipo_plan;
    
    private String id_cliente;
    
    private String idplan;
    
    private String iduser;
   
    private boolean noti;
    
    private boolean notiplan;
    
    //fk_docdescricion
    @OneToMany(mappedBy = "documentoservicio")
    private List<DocumentoDescripcion> docdescripcion;
    
  ///fk_pagos
    @OneToMany(mappedBy ="docservice")
    private  List<Pagos> pagos;   



    public DocumentoServicio(){}

	public Long getId_documentoservicio() {
        return id_documentoservicio;
    }
    public void setId_documentoservicio(Long id_documentoservicio) {
        this.id_documentoservicio = id_documentoservicio;
    }
    public double getCosto() {
		return costo;
	}

	public void setCosto(double costo) {
		this.costo = costo;
	}

	public boolean isNotiplan() {
		return notiplan;
	}

	public void setNotiplan(boolean notiplan) {
		this.notiplan = notiplan;
	}

	public Date getFecha_ds() {
        return fecha_ds;
    }
    public void setFecha_ds(Date fecha_ds) {
        this.fecha_ds = fecha_ds;
    }

    public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(String id_cliente) {
		this.id_cliente = id_cliente;
	}

	public Date getFecha_inicion() {
        return fecha_inicion;
    }
    public void setFecha_inicion(Date fecha_inicion) {
        this.fecha_inicion = fecha_inicion;
    }
    public Date getFecha_fin() {
        return fecha_fin;
    }
    
    public String getIdplan() {
		return idplan;
	}

	public void setIdplan(String idplan) {
		this.idplan = idplan;
	}

	public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }
    public String getEstado() {
        return Estado;
    }
    public void setEstado(String estado) {
        Estado = estado;
    }

    public boolean isNoti() {
		return noti;
	}

	public void setNoti(boolean noti) {
		this.noti = noti;
	}

	public double getCosto_plan() {
        return costo_plan;
    }

    public void setCosto_plan(double costo_plan) {
        this.costo_plan = costo_plan;
    }

    public Date getFecha_fin_plan() {
        return fecha_fin_plan;
    }

    public void setFecha_fin_plan(Date fecha_fin_plan) {
        this.fecha_fin_plan = fecha_fin_plan;
    }

    public String getTipo_plan() {
        return tipo_plan;
    }

    public void setTipo_plan(String tipo_plan) {
        this.tipo_plan = tipo_plan;
    }

	public String getIduser() {
		return iduser;
	}

	public void setIduser(String iduser) {
		this.iduser = iduser;
	}


}
