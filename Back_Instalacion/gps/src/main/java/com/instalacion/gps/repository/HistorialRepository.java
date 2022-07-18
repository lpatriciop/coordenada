package com.instalacion.gps.repository;

import com.instalacion.gps.models.Historial;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HistorialRepository  extends JpaRepository<Historial,Long> {

    @Query("SELECT h FROM Historial h WHERE h.documentodescripcion.vehiculo.cliente.id_persona=?1")
	List<Historial> findByCliente(Long idpersona);

    
}
