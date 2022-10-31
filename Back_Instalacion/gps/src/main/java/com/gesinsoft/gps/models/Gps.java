package com.gesinsoft.gps.models;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
@Entity
@Table(name = "gps")
public class Gps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_gps;
    private  String num_gps;
    private  String num_sim;
    private  String imei_gps;
    private  String estado;
    //fk_modelo
    @OneToOne
    @JoinColumn(name="id_modelo")
    private Modelo modelo;
    
    //fk_docdescripcion
    @OneToMany(mappedBy = "gps")
    private List<DocumentoDescripcion> docdescripcion;

    //fk_modelos
     @OneToMany(mappedBy = "gps")
     private List<Modelo> modelos;

    public Gps(String num_gps, String num_sim, String imei_gps, String estado) {
        this.num_gps = num_gps;
        this.num_sim = num_sim;
        this.imei_gps = imei_gps;
        this.estado = estado;
    }
    public Gps(){}

    public Long getId_gps() {
        return id_gps;
    }
    public void setId_gps(Long id_gps) {
        this.id_gps = id_gps;
    }
    public String getNum_gps() {
        return num_gps;
    }
    public Modelo getModelo() {
		return modelo;
	}
	public void setModelo(Modelo modelo) {
		this.modelo = modelo;
	}
	public void setNum_gps(String num_gps) {
        this.num_gps = num_gps;
    }
    public String getNum_sim() {
        return num_sim;
    }
    public void setNum_sim(String num_sim) {
        this.num_sim = num_sim;
    }
    public String getImei_gps() {
        return imei_gps;
    }
    public void setImei_gps(String imei_gps) {
        this.imei_gps = imei_gps;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
 
}
