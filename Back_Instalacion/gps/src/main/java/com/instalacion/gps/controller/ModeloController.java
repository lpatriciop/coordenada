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

import com.instalacion.gps.models.Modelo;
import com.instalacion.gps.repository.ModeloRepository;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/models")
public class ModeloController {

	@Autowired
    private ModeloRepository  repository;

    @GetMapping("/")
	public List<Modelo> readAll() {
		return repository.findAll();
	}

	@PostMapping("/create-model")
	public Modelo create(@Validated @RequestBody Modelo l) {
		return repository.save(l);
	}

	@PutMapping("/update-model/{id}")
	public Modelo update(@PathVariable Long id, @Validated @RequestBody Modelo l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-model/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
}
