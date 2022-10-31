package com.gesinsoft.gps.security.services;

import java.util.List;
import java.util.Optional;

import com.gesinsoft.gps.security.entity.Rol;
import com.gesinsoft.gps.security.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import com.instalacion.gps.security.entity.Usuario;

//import com.instalacion.gps.security.repository.UsuarioRepository;

@Service
@Transactional
public class RolService {

	@Autowired
	public RolRepository rolRepository;
	
	public Optional<Rol> getByUsername(String rolNombre){
		return rolRepository.findByRolNombre(rolNombre);
	}
	
	public Rol save(Rol rol) {
		return rolRepository.save(rol);
	}
	
	public List<Rol> getAll(){
		return rolRepository.findAll();
	}
	
	public Optional<Rol> getByrolNombre(Rol rol){
		return rolRepository.findByRolNombre(rol.getRolNombre());
	}
	
}
