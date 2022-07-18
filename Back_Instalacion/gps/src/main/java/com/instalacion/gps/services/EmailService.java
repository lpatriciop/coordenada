package com.instalacion.gps.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Value("${spring.mail.username}")
    private String correo;
	
	@Autowired
    private JavaMailSender javaMailSender;

    public boolean enviarEmail(String correoReceptor, String asunto, String cuerpoMensaje){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(correo);
        mail.setTo(correoReceptor);
        mail.setSubject(asunto);
        mail.setText(cuerpoMensaje);
        try {
        	javaMailSender.send(mail);
        	return true;
        } catch (Exception e) {
            System.out.println("Error email: " + e.getMessage());
            return false;
        }
    }
}
