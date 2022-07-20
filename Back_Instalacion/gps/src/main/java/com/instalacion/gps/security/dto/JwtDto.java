package com.instalacion.gps.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtDto {
	
	private Long id;
	
	private String token;
	
	private String bearer = "Bearer";
	
	private String email;
	
	private String nombre;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	public JwtDto(String token, Long id, String email, String nombre, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.token = token;
		this.email = email;
		this.nombre = nombre;
		this.authorities = authorities;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getBearer() {
		return bearer;
	}

	public void setBearer(String bearer) {
		this.bearer = bearer;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
}
