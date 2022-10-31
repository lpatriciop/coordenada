package com.gesinsoft.gps.repository;

import com.gesinsoft.gps.models.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    
	Cliente findByCedula(String cedula);
}
