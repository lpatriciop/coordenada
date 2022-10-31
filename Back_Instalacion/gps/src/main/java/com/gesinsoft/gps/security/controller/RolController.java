package com.gesinsoft.gps.security.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gesinsoft.gps.security.entity.Rol;
import com.gesinsoft.gps.security.services.RolService;

@RestController
@RequestMapping("/rol")
@CrossOrigin
public class RolController {

	@Autowired
	private RolService rolService;
	
	@GetMapping("/")
	public List<Rol> readAll(){
		return rolService.getAll();
	}
	
	@PostMapping("/create-rol/")
	public Rol save(@RequestBody Rol nuevoRol) {
		Optional<Rol> r=rolService.getByrolNombre(nuevoRol);
		if (!r.isPresent()) {
			return rolService.save(nuevoRol);
		}else {
			return null;
		}
	}
}
