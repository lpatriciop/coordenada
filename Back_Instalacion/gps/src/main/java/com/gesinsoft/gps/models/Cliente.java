package com.gesinsoft.gps.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;


@Entity
@Table(name = "cliente")
@PrimaryKeyJoinColumn(referencedColumnName="id_persona")
public class Cliente extends Persona {

    private  String cedula;

    private  String estado;
    
    private String contacto;
    
    private String ciudad;

    @OneToMany(mappedBy ="cliente")
    private  List<Vehiculo> vehiculos;

    public Cliente(String cedula, String estado) {
        this.cedula = cedula;
        this.estado = estado;
    }

	public String getContacto() {
		return contacto;
	}



	public void setContacto(String contacto) {
		this.contacto = contacto;
	}



	public String getCiudad() {
		return ciudad;
	}



	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}



	public String getCedula() {
        return cedula;
    }

	public Cliente() {

	}


	public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
