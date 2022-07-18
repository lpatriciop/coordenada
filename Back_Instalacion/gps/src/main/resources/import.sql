INSERT INTO public.modelo(estado, nombre) VALUES ( 'Activo','rj');
INSERT INTO public.modelo(estado, nombre) VALUES ( 'Activo','rjdos');
INSERT INTO public.modelo(estado, nombre) VALUES ( 'Activo','rjTres');
INSERT INTO public.modelo(estado, nombre) VALUES ( 'Activo','rjCuatro');
	--------------------------------
INSERT INTO public.gps(estado, imei_gps, num_gps, num_sim, id_modelo) VALUES ( 'Activo', 1111, 1111, 1111, 1);
INSERT INTO public.gps(estado, imei_gps, num_gps, num_sim, id_modelo) VALUES ( 'Activo', 1212, 1212, 1212, 2);
INSERT INTO public.gps(estado, imei_gps, num_gps, num_sim, id_modelo) VALUES ( 'Activo', 1313, 1313, 1313, 3);
INSERT INTO public.gps(estado, imei_gps, num_gps, num_sim, id_modelo) VALUES ( 'Activo', 1412, 1414, 1414, 4);
	--------------------------------
INSERT INTO public.persona(correo, direccion, nombre, telefono)	VALUES ( 'gabo@gmail.com', 'El Valle', 'Angel Villa', '0991856543');
INSERT INTO public.persona(correo, direccion, nombre, telefono)	VALUES ( 'angel@gmail.com', 'El Carme', 'Carla Luna', '0081556546');
INSERT INTO public.persona(correo, direccion, nombre, telefono)	VALUES ( 'ismael@gmail.com', 'Tejar', 'Pablo Armijos', '091155699');
INSERT INTO public.persona(correo, direccion, nombre, telefono)	VALUES ( 'graci12@gmail.com', 'totems', 'Graciela Loja', '097155657');
	--------------------------------
INSERT INTO public.cliente(cedula, ciudad, contacto, estado, id_persona) VALUES ('0127853732','Cuenca','Carla Rivera','Activo', 1);
INSERT INTO public.cliente(cedula, ciudad, contacto, estado, id_persona) VALUES ('0107853733','El Oro','Diego Almeida','Activo', 2);
INSERT INTO public.cliente(cedula, ciudad, contacto, estado, id_persona) VALUES ('0612853755','Guayaquil','Fabian Chuqui','Activo', 3);
INSERT INTO public.cliente(cedula, ciudad, contacto, estado, id_persona) VALUES ('0613853789','Quito','Mateo Espinoza','Activo', 4);
	--------------------------------
INSERT INTO public.vehiculo(anio, clave, estado, kilometraje, placa, vehiculo, id_cliente) VALUES ( 2022, 1111, 'Activo', 2000, 'Abc-123','Mazda', 1);
INSERT INTO public.vehiculo(anio, clave, estado, kilometraje, placa, vehiculo, id_cliente) VALUES ( 2007, 2222, 'Activo', 3000, 'Cbc-124','vitara', 1);
INSERT INTO public.vehiculo(anio, clave, estado, kilometraje, placa, vehiculo, id_cliente) VALUES ( 2008, 3333, 'Activo', 3500, 'Bbc-225','Dimax', 1);
INSERT INTO public.vehiculo(anio, clave, estado, kilometraje, placa, vehiculo, id_cliente) VALUES ( 2001, 4444, 'Activo', 3500, 'Dbc-345','Aveo', 2);
	--------------------------------------------
INSERT INTO public.plan(costo_p, descripcion_plan, estado_plan, imagen, nombre_p, num_descripcion_p, p_costo_mensual, id_modelo) VALUES ( 120,'por navidad','Activo', ?,'plan A',1,120 ,1);
	
	--------------------------------------------
	INSERT INTO public.documentoservicio(
	 estado, costo, costo_plan, fecha_ds, fecha_fin, fecha_fin_plan, fecha_inicion, hora, id_cliente, idplan, tipo_plan)
	VALUES ( 'Activo','', ?, ?, ?, ?, ?, ?, ?, ?, ?);
	INSERT INTO public.documentoservicio(
	 estado, costo, costo_plan, fecha_ds, fecha_fin, fecha_fin_plan, fecha_inicion, hora, id_cliente, idplan, tipo_plan)
	VALUES ( 'Activo','', ?, ?, ?, ?, ?, ?, ?, ?, ?);
	
	--------------------------------------------
	INSERT INTO public.documentodescripcion(
	 estado, fecha_inst, imagen, observacion, ubicacion, id_documentoservicio, id_gps, id_vehiculo)
	VALUES ('Activo',11/03/2021, ?, 'puerta sin seguro', 'la capota',1,1,1);
	INSERT INTO public.documentodescripcion(
	 estado, fecha_inst, imagen, observacion, ubicacion, id_documentoservicio, id_gps, id_vehiculo)
	VALUES ('Activo',15/02/2022, ?, 'sobre la capota', 'las entradas del',2,2,2);
	
	
	
	
	
			