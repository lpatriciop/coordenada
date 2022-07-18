package com.instalacion.gps.repository;
import com.instalacion.gps.models.Acciones;

import org.springframework.data.jpa.repository.JpaRepository;
public interface AccionesRepository extends JpaRepository<Acciones,Long>  {
    
}
