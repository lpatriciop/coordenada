package com.gesinsoft.gps.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gesinsoft.gps.security.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	Optional<Usuario> findByCorreo(String correo);
	
	public boolean existsByCorreo(String email);
}
