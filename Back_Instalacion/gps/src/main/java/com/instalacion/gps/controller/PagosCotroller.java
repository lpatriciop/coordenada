package com.instalacion.gps.controller;

import java.util.List;
import java.util.Optional;

import com.instalacion.gps.models.Pagos;
import com.instalacion.gps.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/pagos")
public class PagosCotroller {
    @Autowired
    private PagoRepository  repository;

    @GetMapping("/")
	public List<Pagos> readAll() {
		return repository.findAll();
	}
    
    @GetMapping("/{id}")
	public Optional<Pagos> readByid(@PathVariable Long id) {
		return repository.findById(id);
	}
    
    @GetMapping("service/{id}")
	public List<Pagos> readByidService(@PathVariable Long id) {
		return repository.findByIdService(id);
	}

	@PostMapping("/create-pagos/")
	public Pagos create(@Validated @RequestBody Pagos l) {
		return repository.save(l);
	}

	@PutMapping("/update-pagos/{id}")
	public Pagos update(@PathVariable Long id, @Validated @RequestBody Pagos l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-pagos/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}
    
}
