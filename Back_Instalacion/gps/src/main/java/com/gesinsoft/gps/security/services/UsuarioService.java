package com.gesinsoft.gps.security.services;

import java.util.List;
import java.util.Optional;

import com.gesinsoft.gps.security.entity.Usuario;
import com.gesinsoft.gps.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
