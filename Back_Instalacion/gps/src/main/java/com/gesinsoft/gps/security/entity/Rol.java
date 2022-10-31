package com.gesinsoft.gps.security.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rol {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String rolNombre;

	public Rol() {
	}


	public void setRolNombre(String rolNombre) {
		this.rolNombre = rolNombre;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRolNombre() {
		return rolNombre;
	}

}
