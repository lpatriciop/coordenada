
package com.gesinsoft.gps.security.utils;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;

import com.gesinsoft.gps.models.Cliente;
import com.gesinsoft.gps.models.DocumentoServicio;
import com.gesinsoft.gps.models.MensajesMail;
import com.gesinsoft.gps.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gesinsoft.gps.repository.ClienteRepository;
import com.gesinsoft.gps.repository.DocumentoSevicioRepository;
import com.gesinsoft.gps.repository.EmailRepository;

@Component
public class WatchServices implements CommandLineRunner{

	@Autowired
    private DocumentoSevicioRepository repository;
	
	@Autowired
    private EmailService emailService;
	
	@Autowired
    private EmailRepository repositoryemail;
	
	@Autowired
    private ClienteRepository repositorycli;
	
	@Override
	public void run(String... args) throws Exception {
		MensajesMail nsms=new MensajesMail();
		int cont=0;
		int contplan=0;
		List<DocumentoServicio> list=repository.findAll();
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			DocumentoServicio documentoServicio = (DocumentoServicio) iterator.next();
			
			LocalDate d1 = LocalDate.parse(String.valueOf(LocalDate.now()), DateTimeFormatter.ISO_LOCAL_DATE);
			//Fecha fin del servicio mensual
	        LocalDate d2 = LocalDate.parse(String.valueOf(documentoServicio.getFecha_fin()), DateTimeFormatter.ISO_LOCAL_DATE);
	        Period period = Period.between(d1, d2);
	        
	        LocalDate d3 = LocalDate.parse(String.valueOf(documentoServicio.getFecha_fin_plan()), DateTimeFormatter.ISO_LOCAL_DATE);
	        Period periodplan = Period.between(d1, d3);
	        
	        if (period.getDays()<=5 && documentoServicio.isNoti()==true) {
				Cliente cliente=repositorycli.getById(Long.valueOf(documentoServicio.getId_cliente()));
				List<MensajesMail> listmail=repositoryemail.findAll();
				for (int i = 0; i < listmail.size(); i++) {
					if (listmail.get(i).getTipoMensaje().toLowerCase()=="agotamiento de servicio") {
						nsms=listmail.get(i);
						cont=1;
					}
				}
				if (cont==0) {
					nsms.setTitle("AGOTAMIENTO DEL SERVICIO");
					nsms.setMensaje("Estimado cliente su servicio en coordenada esta a punto de agotarse\n");
				}
				emailService.enviarEmail(cliente.getCorreo(), nsms.getMensaje(), nsms.getTitle());

			}else if(periodplan.getDays()<=5 && documentoServicio.isNotiplan()==true) {
				Cliente clientes=repositorycli.getById(Long.valueOf(documentoServicio.getId_cliente()));
				List<MensajesMail> listmail=repositoryemail.findAll();
				for (int i = 0; i < listmail.size(); i++) {
					if (listmail.get(i).getTipoMensaje().toLowerCase()=="vencimiento de plan") {
						nsms=listmail.get(i);
						contplan=1;
					}
				}
				if (cont==0) {
					nsms.setTitle("VENCIMIENTO DEL PLAN");
					nsms.setMensaje("Estimado cliente su contrato del plan en coordenada esta a punto de terminarse\n");
				}
				emailService.enviarEmail(clientes.getCorreo(), nsms.getMensaje(), nsms.getTitle());
			}
		}
	}

}
