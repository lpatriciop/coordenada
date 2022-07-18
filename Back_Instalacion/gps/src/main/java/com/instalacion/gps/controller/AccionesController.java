package com.instalacion.gps.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.instalacion.gps.models.Acciones;
import com.instalacion.gps.repository.AccionesRepository;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/accions")
public class AccionesController {

	@Autowired
    private AccionesRepository repository;

    @GetMapping("/")
	public List<Acciones> readAll() {
		return repository.findAll();
	}

	@PostMapping("/create-accion/")
	public Acciones create(@Validated @RequestBody Acciones l) {
		return repository.save(l);
	}

	@PutMapping("/update-accion/{id}")
	public Acciones update(@PathVariable Long id, @Validated @RequestBody Acciones l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-accion/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
}
