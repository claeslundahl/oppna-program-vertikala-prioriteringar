package se.vgregion.verticalprio.entity;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;

import se.vgregion.dao.domain.patterns.entity.AbstractEntity;

@SuppressWarnings("serial")
@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Cacheable(value = true)
public abstract class AbstractKod extends AbstractEntity<Long> implements Serializable, Comparable<AbstractKod> {

    @Id
    private Long id;

    @Column(name = "kod")
    private String kod;

    @Column(name = "beskrivning", length = 1000)
    private String beskrivning;

    @Column(name = "kort_beskrivning", length = 1000)
    private String kortBeskrivning;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKod() {
        return kod;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public String getBeskrivning() {
        return beskrivning;
    }

    public void setBeskrivning(String beskrivning) {
        this.beskrivning = beskrivning;
    }

    /**
     * @inheritDoc
     */
    @Override
    public String toString() {
        return getLabel();
    }

    public String getLabel() {
        if (kortBeskrivning != null) {
            return kortBeskrivning;
        }
        return (nullAsBlank(kod) + " " + nullAsBlank(beskrivning)).trim();
    }

    private String nullAsBlank(String s) {
        if (s == null) {
            return "";
        }
        return s;
    }

    public void setKortBeskrivning(String kortBeskrivning) {
        this.kortBeskrivning = kortBeskrivning;
    }

    public String getKortBeskrivning() {
        return kortBeskrivning;
    }

    /**
     * @inheritDoc
     */
    @Override
    public int compareTo(AbstractKod o) {
        int other = 0, self = 0;
        if (kod != null) {
            self = hashCode();
        }
        if (o != null && o.kod != null) {
            other = o.kod.hashCode();
        }
        return self - other;
    }

    public String getKodPlusBeskrivning() {
        return (format(getKod()) + " " + format(getBeskrivning())).trim();
    }

    private String format(String s) {
        if (s == null) {
            return "";
        }
        return s.trim();
    }

}
