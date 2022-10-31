package com.gesinsoft.gps.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gesinsoft.gps.security.entity.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
	
	public Optional<Rol> findByRolNombre(String rolNombre);

}
