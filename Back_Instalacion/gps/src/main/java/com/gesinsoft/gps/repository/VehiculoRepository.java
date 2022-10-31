package com.gesinsoft.gps.repository;

import com.gesinsoft.gps.models.Vehiculo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehiculoRepository extends JpaRepository<Vehiculo,Long>  {
	
	@Query("Select v FROM Vehiculo v WHERE v.cliente.id_persona = ?1")
	List<Vehiculo> findByClienteid(Long cliente);
}
