package se.vgregion.verticalprio.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Risk med åtgärd.
 * 
 * @author Claes Lundahl, vgrid=clalu4
 * 
 */
@Entity
@Table(name = "aatgaerds_risk_kod")
public class AatgaerdsRiskKod extends AbstractKod<AatgaerdsRiskKod> {

}