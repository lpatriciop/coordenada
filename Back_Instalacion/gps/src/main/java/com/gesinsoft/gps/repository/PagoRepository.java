package com.gesinsoft.gps.repository;

import com.gesinsoft.gps.models.Pagos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PagoRepository  extends JpaRepository<Pagos,Long>{
    
	@Query("SELECT p FROM Pagos p WHERE p.docservice.id_documentoservicio= ?1")
	List<Pagos> findByIdService (Long id_service);
}
