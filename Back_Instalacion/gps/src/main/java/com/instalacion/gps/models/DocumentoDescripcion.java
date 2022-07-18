package com.instalacion.gps.models;

import java.util.List;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "documentodescripcion")
public class DocumentoDescripcion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_documentodescripcion;
	private String estado;
	private String observacion;
	private String ubicacion;
	private String imagen;
	private Date fecha_inst;

//fk_documentoservicio
	@ManyToOne
	@JoinColumn(name = "id_documentoservicio")
	private DocumentoServicio documentoservicio;

	// id_gps
	@ManyToOne
	@JoinColumn(name = "id_gps")
	private Gps gps;

	// -----------------------
	@OneToMany(mappedBy = "documentodescripcion")
	private List<Historial> historial;
	
	
	@ManyToOne
	@JoinColumn(name = "id_vehiculo")
    private Vehiculo vehiculo;

	public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
	}

	public DocumentoDescripcion() {
	}

	public Long getId_documentodescripcion() {
		return id_documentodescripcion;
	}

	public void setId_documentodescripcion(Long id_documentodescripcion) {
		this.id_documentodescripcion = id_documentodescripcion;
	}

	public String getEstado() {
		return estado;
	}
	
	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public DocumentoServicio getDocumentoservicio() {
		return documentoservicio;
	}

	public void setDocumentoservicio(DocumentoServicio documentoservicio) {
		this.documentoservicio = documentoservicio;
	}

	public Gps getGps() {
		return gps;
	}

	public void setGps(Gps gps) {
		this.gps = gps;
	}

	public Date getFecha_inst() {
		return fecha_inst;
	}

	public void setFecha_inst(Date fecha_inst) {
		this.fecha_inst = fecha_inst;
	}


}
