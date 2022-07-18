package com.instalacion.gps.repository;

import com.instalacion.gps.models.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    
	Cliente findByCedula(String cedula);
}
