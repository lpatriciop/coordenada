package com.gesinsoft.gps.models;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name = "pagos")
public class Pagos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_pagos;
    private Date fecha_pago;
    private Double cantidad_p;

    //fk_docServicio
    @ManyToOne
    @JoinColumn(name="id_documentoservicio")
    private DocumentoServicio docservice;

    public Pagos(){
    }
    public Pagos(Date fecha_pago, Double cantidad_p) {
        this.fecha_pago = fecha_pago;
        this.cantidad_p = cantidad_p;
    }
    public Long getId_pagos() {
        return id_pagos;
    }
    public void setId_pagos(Long id_pagos) {
        this.id_pagos = id_pagos;
    }
    public Date getFecha_pago() {
        return fecha_pago;
    }
    public void setFecha_pago(Date fecha_pago) {
        this.fecha_pago = fecha_pago;
    }
    public Double getCantidad_p() {
        return cantidad_p;
    }
    public void setCantidad_p(Double cantidad_p) {
        this.cantidad_p = cantidad_p;
    }
    public DocumentoServicio getDocservice() {
        return docservice;
    }
    public void setDocservice(DocumentoServicio docservice) {
        this.docservice = docservice;
    }
    
}
