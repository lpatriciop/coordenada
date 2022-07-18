package com.instalacion.gps.repository;

import com.instalacion.gps.models.Plan;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan,Long> {
}
