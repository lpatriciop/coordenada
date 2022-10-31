package com.gesinsoft.gps.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

//Comprobar si hay un token válido

@Component
public class JwtEntryPoint implements AuthenticationEntryPoint{

	private final static Logger logger = LoggerFactory.getLogger(JwtEntryPoint.class);
	
	//Rechaza las peticiones no autentificadas enviando respuesta no autorizada
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		logger.error("Fail en método commence");
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No Autorizado");;
	}

}
