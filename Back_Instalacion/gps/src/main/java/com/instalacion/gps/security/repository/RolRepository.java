package com.instalacion.gps.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instalacion.gps.security.entity.Rol;
import com.instalacion.gps.security.enums.RolNombre;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
	
	public Optional<Rol> findByRolNombre(RolNombre rolNombre);

}
