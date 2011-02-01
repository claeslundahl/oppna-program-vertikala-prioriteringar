package se.vgregion.verticalprio.repository;

import java.util.ArrayList;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;

import se.vgregion.verticalprio.entity.DiagnosKod;
import se.vgregion.verticalprio.entity.Prioriteringsobjekt;
import se.vgregion.verticalprio.entity.SektorRaad;

/**
 * @author Claes Lundahl, vgrid=clalu4
 * 
 */
public class JpqlMatchBuilderTest {

    /**
     * Test method for
     * {@link se.vgregion.verticalprio.repository.JpqlMatchBuilder#mkFindByExampleJpql(java.lang.Object, java.util.List)}
     * .
     */
    @Test
    public final void mkFindByExampleJpql() {
        JpqlMatchBuilder builder = new JpqlMatchBuilder();
        builder.getSortOrder().add("id");
        builder.getSortOrder().add("kommentar");

        List<Object> values = new ArrayList<Object>();

        Prioriteringsobjekt prio = new Prioriteringsobjekt();
        prio.setKommentar("kommentar");
        DiagnosKod diagnos1 = new DiagnosKod();
        diagnos1.setBeskrivning("Kolera*");
        DiagnosKod diagnos2 = new DiagnosKod();
        diagnos2.setBeskrivning("Ticks*");
        prio.getDiagnoser().add(diagnos1);
        prio.getDiagnoser().add(diagnos2);

        NestedSektorRaad nestedSektorRaad = new NestedSektorRaad();
        SektorRaad raad1 = new SektorRaad(43l), raad2 = new SektorRaad(44l);
        raad1.setBeskrivning("Sektorråd med id 43.");
        nestedSektorRaad.content().add(raad1);
        nestedSektorRaad.content().add(raad2);
        prio.setSektorRaad(nestedSektorRaad);

        String jpql = builder.mkFindByExampleJpql(prio, values);
        System.out.println(jpql);
        System.out.println(values);

        Assert.assertTrue(jpql.contains("Prioriteringsobjekt"));

        Assert.assertTrue(values.contains("Kolera%"));
        Assert.assertTrue(values.contains("Ticks%"));
        Assert.assertTrue(values.contains("Sektorråd med id 43."));

        Assert.assertTrue(jpql.contains("from"));
        Assert.assertTrue(jpql.contains("where"));
        Assert.assertTrue(jpql.contains("beskrivning like ?"));
        Assert.assertTrue(jpql.contains("kommentar = ?"));
    }
}