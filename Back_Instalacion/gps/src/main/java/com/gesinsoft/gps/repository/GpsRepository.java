package com.gesinsoft.gps.repository;

import com.gesinsoft.gps.models.Gps;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GpsRepository extends JpaRepository<Gps,Long>{
	@Query("SELECT g FROM Gps g WHERE g.imei_gps LIKE %:imei_gps%")
    Optional<Gps> findByImei_gpsLike(@Param("imei_gps")String imei_gps);
}
