package com.instalacion.gps.repository;


import com.instalacion.gps.models.MensajesMail;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmailRepository extends JpaRepository<MensajesMail,Long>{
    
}
