package com.instalacion.gps.repository;
import com.instalacion.gps.models.DocumentoServicio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DocumentoSevicioRepository extends JpaRepository<DocumentoServicio,Long>  {
	  
	@Query("SELECT d FROM DocumentoServicio d WHERE d.id_cliente=?1")
	List<DocumentoServicio> findByidCliente(String idcli);
}
