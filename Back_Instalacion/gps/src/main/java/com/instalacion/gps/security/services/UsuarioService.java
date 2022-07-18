package com.instalacion.gps.security.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.instalacion.gps.security.entity.Usuario;
import com.instalacion.gps.security.repository.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {
	
	@Autowired
	public UsuarioRepository usuarioRepository;
	
	public Optional<Usuario> getByEmail(String correo){
		return usuarioRepository.findByCorreo(correo);
	}
		
	public boolean existsByEmail(String email) {
		return usuarioRepository.existsByCorreo(email);
	}
	
	public Usuario save(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	public List<Usuario> readAll() {
		return usuarioRepository.findAll();
	}
	
	public Usuario update(Usuario l) {
		Optional<Usuario> user=usuarioRepository.findById(l.getId_persona());
		if (user.isPresent()) {
			return usuarioRepository.save(l);
		}else {
			return null;
		}
		
	}

	public Usuario buscarid(Long id) {
			return usuarioRepository.findById(id).get();
		
	}
	
	public Usuario buscarCorreo(String email) {
		Optional<Usuario> user=usuarioRepository.findByCorreo(email);
		return user.get();
	}
	
	
}
