
package com.instalacion.gps.security.utils; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.instalacion.gps.security.entity.Rol;
import com.instalacion.gps.security.enums.RolNombre;
import com.instalacion.gps.security.services.RolService;

@Component
public class CreateRoles implements CommandLineRunner{

	@Autowired
	RolService rolService;
	
	@Override
	public void run(String... args) throws Exception {
		Rol rolAdmin = new Rol(RolNombre.ROLE_ADMIN);
		Rol rolinstall = new Rol(RolNombre.ROLE_INSTALL);
		//rolService.save(rolAdmin);
		//rolService.save(rolinstall);
	}

}
