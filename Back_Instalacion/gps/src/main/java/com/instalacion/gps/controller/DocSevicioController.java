package com.instalacion.gps.controller;

import java.util.List;
import java.util.Optional;

import com.instalacion.gps.models.DocumentoServicio;
import com.instalacion.gps.repository.DocumentoSevicioRepository;
import com.instalacion.gps.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/docservicio")
public class DocSevicioController {

    @Autowired
    private DocumentoSevicioRepository repository;
    
    @Autowired
    private EmailService emailService;

    @GetMapping("/")
	public List<DocumentoServicio> readAll() {
		return repository.findAll();
	}
    
    @GetMapping("/{id}")
	public Optional<DocumentoServicio> readByid(@PathVariable Long id) {
		return repository.findById(id);
	}
    
    @GetMapping("/mail/{emailrecep}")
	public boolean MensajeEmail(@PathVariable String emailrecep) {
    	System.out.println(emailrecep);
    	String title="Mensaje de COntrato de servicio";
    	String mensaje="Usted a realizado el contrato de un servicio en COordenada";
    	emailService.enviarEmail(emailrecep, title, mensaje);
    		return true;

		
	}
    
    @GetMapping("/cliente/idcli/{id}")
	public List<DocumentoServicio> readByidCli(@PathVariable String id) {
		return repository.findByidCliente(id);
	}

	@PostMapping("/create-docservicio")
	public DocumentoServicio create(@Validated @RequestBody DocumentoServicio l) {
		return repository.save(l);
	}

	@PutMapping("/update-docservicio/{id}")
	public DocumentoServicio update(@PathVariable Long id, @Validated @RequestBody DocumentoServicio l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-docservicio/{id}")
	public void delete(@PathVariable Long id) {
		repository.deleteById(id);
    }
}
