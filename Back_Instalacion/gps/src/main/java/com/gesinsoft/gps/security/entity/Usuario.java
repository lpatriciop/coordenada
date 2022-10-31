package com.gesinsoft.gps.security.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.gesinsoft.gps.models.Persona;

@Entity
@Table(name = "usuario")
@PrimaryKeyJoinColumn(referencedColumnName="id_persona")
public class Usuario extends Persona {

	private String password;

    private String estado;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "usuario_id"), 
	inverseJoinColumns = @JoinColumn(name = "rol_id"))
	private Set<Rol> roles = new HashSet<>();

	public Usuario() {
	}


	public Usuario(Long id_persona, String nombre, String direccion, String correo, String telefono, String password,
			String estado) {
		super(id_persona, nombre, direccion, correo, telefono);
		this.password = password;
		this.estado = estado;

	}


	@Override
	public String getCorreo() {
		// TODO Auto-generated method stub
		return super.getCorreo();
	}


	@Override
	public void setCorreo(String correo) {
		// TODO Auto-generated method stub
		super.setCorreo(correo);
	}


	public Usuario(String password, String estado) {
		this.password = password;
		this.estado = estado;
	}


	public Usuario(String nombre, String direccion, String correo, String telefono, String password, String estado) {
		super(nombre, direccion, correo, telefono);
		this.password = password;
		this.estado = estado;
	}


	@Override
	public Long getId_persona() {
		// TODO Auto-generated method stub
		return super.getId_persona();
	}


	@Override
	public void setId_persona(Long id_persona) {
		// TODO Auto-generated method stub
		super.setId_persona(id_persona);
	}


	@Override
	public String getNombre() {
		// TODO Auto-generated method stub
		return super.getNombre();
	}


	@Override
	public void setNombre(String nombre) {
		// TODO Auto-generated method stub
		super.setNombre(nombre);
	}


	@Override
	public String getDireccion() {
		// TODO Auto-generated method stub
		return super.getDireccion();
	}


	@Override
	public void setDireccion(String direccion) {
		// TODO Auto-generated method stub
		super.setDireccion(direccion);
	}


	@Override
	public String getTelefono() {
		// TODO Auto-generated method stub
		return super.getTelefono();
	}


	@Override
	public void setTelefono(String telefono) {
		// TODO Auto-generated method stub
		super.setTelefono(telefono);
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Rol> getRoles() {
		return roles;
	}

	public void setRoles(Set<Rol> roles) {
		this.roles = roles;
	}
	
}
