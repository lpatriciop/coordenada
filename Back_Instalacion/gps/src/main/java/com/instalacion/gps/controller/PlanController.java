package com.instalacion.gps.controller;

import java.util.List;
import java.util.Optional;

//import com.instalacion.gps.models.Cliente;
import com.instalacion.gps.models.Plan;
import com.instalacion.gps.repository.PlanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/plan")
public class PlanController {

    @Autowired
    private PlanRepository  repository;

    @GetMapping("/")
	public List<Plan> readAll() {
		return repository.findAll();
	}
    
    @GetMapping("/{id}")
   	public Optional<Plan> buscarplan(@PathVariable Long id) {
   		return repository.findById(id);
   	}

	@PostMapping("/create-plan/")
	public Plan create(@Validated @RequestBody Plan l) {
		return repository.save(l);
	}

	@PutMapping("/update-plan/{id}")
	public Plan update(@PathVariable Long id, @Validated @RequestBody Plan l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-plan/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}

    
}
