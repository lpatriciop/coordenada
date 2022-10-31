package com.gesinsoft.gps.controller;
import java.util.List;
import java.util.Optional;

import com.gesinsoft.gps.models.Cliente;
import com.gesinsoft.gps.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;




@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/client")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping("/")
	public List<Cliente> readAll() {
		return repository.findAll();
	}
    
	@GetMapping("/cliente/{cedula}")
    public Cliente getClienteCedula(@PathVariable String cedula) {
        Cliente lista = repository.findByCedula(cedula);
        if (lista!=null) {
        	return lista; 	
		} else {
			return null;
		}
        
    }



    @GetMapping("/{id}")
   	public Optional<Cliente> buscarcliente(@PathVariable Long id) {
   		return repository.findById(id);
   	}

	@PostMapping("/create-client/")
	public Cliente create(@Validated @RequestBody Cliente l) {
		return repository.save(l);
	}


	@PutMapping("/update-client/{id}")
	public Cliente update(@PathVariable Long id, @Validated @RequestBody Cliente l) {
		return repository.save(l);
	}

	@PutMapping("/delete/{id}")
	public Cliente delete(@PathVariable Long id,@Validated @RequestBody Cliente l) {
		return repository.save(l);
	}

    
}
