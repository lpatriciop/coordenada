package com.gesinsoft.gps.controller;

import java.util.List;
import java.util.Optional;

import com.gesinsoft.gps.models.Historial;
import com.gesinsoft.gps.repository.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/historial")
public class HistorialController {

    @Autowired
    private HistorialRepository  repository;

    @GetMapping("/")
	public List<Historial> readAll() {
		return repository.findAll();
	}

	@PostMapping("/create-historial/")
	public Historial create(@Validated @RequestBody Historial l) {
		return repository.save(l);
	}

	@GetMapping("/cli-hist/{id}")
   	public List<Historial> BuscarHistorialCli(@PathVariable Long id) {
   		return repository.findByCliente(id);
   	}
	
	
	@GetMapping("/{id}")
   	public Optional<Historial> BUscarCliId(@PathVariable Long id) {
   		return repository.findById(id);
   	}
    
}
