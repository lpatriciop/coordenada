package com.instalacion.gps.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;
@Entity
@Table(name = "historial")
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_historial;
    private  String nombre;
    private Date fecha_cam;
    private String observaciones;
    
    //fk_documento_Descripcion
     @ManyToOne
     @JoinColumn(name="id_documentodescripcion")
     private DocumentoDescripcion documentodescripcion;

    Historial(){

    }
    public Historial(String nombre) {
        this.nombre = nombre;
    }
    public Long getId_historial() {
        return id_historial;
    }
    public void setId_historial(Long id_historial) {
        this.id_historial = id_historial;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public Date getFecha_cam() {
        return fecha_cam;
    }
    public void setFecha_cam(Date fecha_cam) {
        this.fecha_cam = fecha_cam;
    }
	public DocumentoDescripcion getDocumentodescripcion() {
		return documentodescripcion;
	}
	public void setDocumentodescripcion(DocumentoDescripcion documentodescripcion) {
		this.documentodescripcion = documentodescripcion;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
    
}
