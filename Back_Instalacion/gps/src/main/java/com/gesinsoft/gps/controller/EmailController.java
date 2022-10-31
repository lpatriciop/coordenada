package com.gesinsoft.gps.controller;

import java.util.List;
import java.util.Optional;

import com.gesinsoft.gps.models.MensajesMail;
import com.gesinsoft.gps.repository.EmailRepository;
import com.gesinsoft.gps.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
		RequestMethod.DELETE })
@RequestMapping("/api/emailservice")
public class EmailController {

    @Autowired
    private EmailRepository repository;
    
    @Autowired
    private EmailService emailService;


    @GetMapping("/")
	public List<MensajesMail> readAll() {
		return repository.findAll();
	}
    
    @GetMapping("/{id}")
	public Optional<MensajesMail> buscarMessage(@PathVariable Long id) {
		return repository.findById(id);
	}
    
    @PostMapping("/mail/{emailrecep}")
	public boolean MensajeEmail(@Validated @RequestBody MensajesMail l,@PathVariable String emailrecep) {
    	if(emailService.enviarEmail(emailrecep, l.getTitle(), l.getMensaje())){
    		return true;
    	}else {
    		return false;
    	}
    		

	}
    
    
	@PostMapping("/create-mesaje-email")
	public MensajesMail createMessage(@Validated @RequestBody MensajesMail l) {
		return repository.save(l);
	}

	@PutMapping("/update-mesaje-email/{id}")
	public MensajesMail updateMessage(@PathVariable Long id, @Validated @RequestBody MensajesMail l) {
		return repository.save(l);
	}

	@DeleteMapping("/delete-mesaje-email/{id}")
	public void deleteMessage(@PathVariable Long id) {
		repository.deleteById(id);
	}
    
    
}
