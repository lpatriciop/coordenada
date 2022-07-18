package com.instalacion.gps.repository;

import com.instalacion.gps.models.Modelo;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ModeloRepository extends JpaRepository<Modelo,Long>  {
    
}
