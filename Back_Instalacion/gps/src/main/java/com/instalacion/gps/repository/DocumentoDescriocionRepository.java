package com.instalacion.gps.repository;
import com.instalacion.gps.models.DocumentoDescripcion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DocumentoDescriocionRepository extends JpaRepository<DocumentoDescripcion,Long>{
    
	@Query("SELECT d FROM DocumentoDescripcion d WHERE d.vehiculo.cliente.id_persona=?1")
	List<DocumentoDescripcion> findByCliente(Long idpersona);
}
