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
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_vehiculo;

    private  String placa;

    private String clave;

    private  String vehiculo;

    private  Integer anio;

    private double kilometraje;

    private String estado;
    //fk_cliente
    @ManyToOne
    @JoinColumn(name="id_cliente")
    private Cliente cliente;
    
 // Fk doc descripcion
    @OneToMany(mappedBy = "vehiculo")
	private List<DocumentoDescripcion> docdescripcion;
    
    public Vehiculo(String placa, String clave, String vehiculo, Integer anio, double  kilometraje, String estado,
			Cliente cliente) {
		super();
		this.placa = placa;
		this.clave = clave;
		this.vehiculo = vehiculo;
		this.anio = anio;
		this.kilometraje = kilometraje;
		this.estado = estado;
		this.cliente = cliente;
	}

	public Vehiculo(){}

	public Long getId_vehiculo() {
		return id_vehiculo;
	}

	public void setId_vehiculo(Long id_vehiculo) {
		this.id_vehiculo = id_vehiculo;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public String getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(String vehiculo) {
		this.vehiculo = vehiculo;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public double getKilometraje() {
		return kilometraje;
	}

	public void setKilometraje(double kilometraje) {
		this.kilometraje = kilometraje;
	}
}
