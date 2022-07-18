package com.instalacion.gps.controller;
import java.util.List;
import java.util.Optional;

import com.instalacion.gps.models.Vehiculo;
import com.instalacion.gps.repository.VehiculoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/vehiculo")
public class VehiculoController {

    @Autowired
    private VehiculoRepository  repository;

    @GetMapping("/")
	public List<Vehiculo> readAll() {
		return repository.findAll();
	}
    
    @GetMapping("/{id}")
	public Optional<Vehiculo> buscarvehiculo(@PathVariable Long id) {
		return repository.findById(id);
	}
    
    @GetMapping("/cli/{id}")
	public List<Vehiculo> buscarvehiculoCli(@PathVariable Long id) {
		return repository.findByClienteid(id);
	}

	@PostMapping("/create-vehiculo")
	public Vehiculo create(@Validated @RequestBody Vehiculo l) {
		return repository.save(l);
	}

	@PutMapping("/update-vehiculo/{id}")
	public Vehiculo update(@PathVariable Long id, @Validated @RequestBody Vehiculo l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-vehiculo/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
    
}
