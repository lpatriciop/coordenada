package com.instalacion.gps.security.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instalacion.gps.models.Mensaje;
import com.instalacion.gps.security.dto.JwtDto;
import com.instalacion.gps.security.dto.LoginUsuario;
import com.instalacion.gps.security.dto.NuevoUsuario;
import com.instalacion.gps.security.entity.Rol;
import com.instalacion.gps.security.entity.Usuario;
import com.instalacion.gps.security.enums.RolNombre;
import com.instalacion.gps.security.jwt.JwtProvider;
import com.instalacion.gps.security.services.RolService;
import com.instalacion.gps.security.services.UsuarioService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class AuthController {

	@Autowired
	public PasswordEncoder passwordEncoder;

	@Autowired
	public AuthenticationManager authenticationManager;

	@Autowired
	public UsuarioService usuarioService;

	@Autowired
	public RolService rolService;

	@Autowired
	public JwtProvider jwtProvider;

	@PostMapping("/")
	public ResponseEntity<?> nuevo(@RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
		if (bindingResult.hasErrors())
			return new ResponseEntity<>(new Mensaje("Campos mal puestos o email inválido"), HttpStatus.BAD_REQUEST);
		if (usuarioService.existsByEmail(nuevoUsuario.getEmail()))
			return new ResponseEntity(new Mensaje("Ya existe el email"), HttpStatus.BAD_REQUEST);
		Usuario usuario = new Usuario(nuevoUsuario.getNombre(),nuevoUsuario.getDireccion(),
				nuevoUsuario.getCorreo(),nuevoUsuario.getTelefono(),passwordEncoder.encode(nuevoUsuario.getPassword()),
				nuevoUsuario.getEstado());
		Set<Rol> roles = new HashSet<>();
		String nrol;
		for (int i = 0; i < rolService.getAll().size(); i++) {
			Rol r=rolService.getAll().get(i);
			nrol = r.getRolNombre();
			if (nuevoUsuario.getRoles().contains(nrol)) {
				roles.add(r);
			}
		}
	
		usuario.setRoles(roles);
		return new ResponseEntity(usuarioService.save(usuario) , HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
		if (bindingResult.hasErrors())
			return new ResponseEntity(new Mensaje("Campos mal puestos"), HttpStatus.BAD_REQUEST);
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginUsuario.getEmail(), loginUsuario.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		Usuario nu=usuarioService.buscarCorreo(userDetails.getUsername());
		
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(),nu.getNombre(), userDetails.getAuthorities());
		return new ResponseEntity<>(jwtDto, HttpStatus.OK);
	}
	
    @GetMapping("/")
	public List<Usuario> ListarAll() {
		return usuarioService.readAll();
	}


	@GetMapping("/{id}")
	public Usuario Listarbyid(@PathVariable Long id) {
		Usuario us=usuarioService.buscarid(id);
		String pass=passwordEncoder.encode(us.getPassword());
		Usuario users=new Usuario(us.getId_persona(),us.getNombre(), us.getDireccion(),
		 us.getCorreo(), us.getTelefono(), 
		 pass, us.getEstado());
		users.setRoles(us.getRoles());
		return users;
	}

 	@PutMapping("/update-user")
	public Usuario update(@Validated @RequestBody NuevoUsuario nu) {
		Usuario l=new Usuario(nu.getId_persona(),nu.getNombre(), nu.getDireccion(), nu.getCorreo(), nu.getTelefono(), passwordEncoder.encode(nu.getPassword()), nu.getEstado());
		for (int i = 0; i < nu.getRoles().size(); i++) {
			String n=nu.getRoles().toString();
			System.out.println(n);
			
		}
		Set<Rol> roles = new HashSet<>();
		String nrol;
		for (int i = 0; i < rolService.getAll().size(); i++) {
			Rol r=rolService.getAll().get(i);
			nrol = r.getRolNombre();
			if (nu.getRoles().contains(nrol)) {
			 System.out.println(nrol);
				roles.add(r);
			}
		}
		l.setRoles(roles);
		return usuarioService.update(l);
	}
}
