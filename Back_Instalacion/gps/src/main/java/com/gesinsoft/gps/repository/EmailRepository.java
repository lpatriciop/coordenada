package com.gesinsoft.gps.repository;


import com.gesinsoft.gps.models.MensajesMail;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmailRepository extends JpaRepository<MensajesMail,Long>{
    
}
