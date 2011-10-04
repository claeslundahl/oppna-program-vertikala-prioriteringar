package se.vgregion.verticalprio;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import junit.framework.Assert;

import org.apache.commons.beanutils.BeanMap;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import se.vgregion.verticalprio.entity.AatgaerdsKod;
import se.vgregion.verticalprio.entity.AbstractKod;
import se.vgregion.verticalprio.entity.AtcKod;
import se.vgregion.verticalprio.entity.DiagnosKod;
import se.vgregion.verticalprio.entity.Prioriteringsobjekt;
import se.vgregion.verticalprio.entity.SektorRaad;
import se.vgregion.verticalprio.entity.TillstaandetsSvaarighetsgradKod;
import se.vgregion.verticalprio.entity.VaardformsKod;
import se.vgregion.verticalprio.repository.GenerisktHierarkisktKodRepository;
import se.vgregion.verticalprio.repository.GenerisktKodRepository;
import se.vgregion.verticalprio.repository.PrioRepository;

/**
 * 
 * Use this 'test' to import data from flat file.
 * 
 * @author Claes Lundahl, vgrid=clalu4
 * 
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:testApplicationContext.xml")
@TransactionConfiguration(defaultRollback = false)
public class ImportTest {

	@Resource(name = "applicationData")
	ApplicationData applicationData;

	@Resource(name = "diagnosKodRepository")
	GenerisktHierarkisktKodRepository<DiagnosKod> diagnosKodRepository;

	@Resource(name = "aatgaerdsKodRepository")
	GenerisktKodRepository<AatgaerdsKod> aatgaerdsKodRepository;

	@Resource(name = "vaardformsKodRepository")
	GenerisktKodRepository<VaardformsKod> vaardformsKodRepository;

	@Resource(name = "atcKodRepository")
	GenerisktKodRepository<AtcKod> atcKodRepository;

	@Resource(name = "prioRepository")
	PrioRepository prioRepository;

	@Test
	public void dummy() {
		Assert.assertTrue(true);
	}

	@Test
	public void foo() throws Exception {
		Date date = new Date();
		long time = date.getTime();
		// List<String> obj = new ArrayList<String>(); // new String(bytes, "8859_1");
		Prioriteringsobjekt obj = new Prioriteringsobjekt();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(obj);
		oos.flush();
		byte[] bytes = baos.toByteArray();

		String utf8 = toByteText(bytes);

		System.out.println(new String(bytes, "UTF-8"));

		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(toBytes(utf8)));

		Prioriteringsobjekt p = (Prioriteringsobjekt) ois.readObject();
		System.out.println("time " + (new Date().getTime() - time));
	}

	private String toByteText(byte[] bytes) {
		StringBuilder sb = new StringBuilder();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		for (byte b : bytes) {
			sb.append(b + "b");
		}
		return sb.toString();
	}

	private byte[] toBytes(String byteText) {
		String[] frags = byteText.split(Pattern.quote("b"));
		byte[] result = new byte[frags.length];
		int i = 0;
		for (String frag : frags) {
			result[i] = Byte.parseByte(frag);
			i++;
		}
		return result;
	}

	// @Test
	// @Transactional()
	// @Rollback(false)
	// public void delte() {
	// long[] ids = { 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 284 };
	//
	// for (long id : ids) {
	// prioRepository.remove(id);
	// }
	// prioRepository.flush();
	// }

	// @Test
	@Transactional()
	@Rollback(false)
	public void main() throws Exception {
		// File file = new File("C:\\temp\\vp-import\\onkologi.txt");
		File file = new File("C:\\temp\\vp-import\\infektion.txt");

		InputStreamReader fr = new InputStreamReader(new FileInputStream(file), "UTF-8");

		// FileReader fr = new FileReader(file);

		int c = fr.read();
		StringBuffer sb = new StringBuffer();
		do {

			sb.append(new Character((char) c));
			c = fr.read();
		} while (c != -1);

		String[] rows = sb.toString().split("\\n");
		System.out.println("Antal rader " + rows.length);

		for (int i = 1; i < rows.length; i++) {
			String row = rows[i];
			handleRow(row);
		}

		System.out.println("getFlattenedSektorRaads: " + getFlattenedSektorRaads());
		fr.close();
	}

	int hits;

	private List<SektorRaad> getFlattenedSektorRaads() {
		List<SektorRaad> result = new ArrayList<SektorRaad>();
		flatten(applicationData.getSektorRaadList(), result);
		return result;
	}

	private void flatten(List<SektorRaad> source, List<SektorRaad> result) {
		if (source == null) {
			return;
		}
		for (SektorRaad sr : source) {
			result.add(sr);
			flatten(sr.getChildren(), result);
		}
	}

	@Transactional
	private void handleRow(String row) {
		try {
			String[] values = row.split(Pattern.quote("|"));

			Prioriteringsobjekt prio = new Prioriteringsobjekt();
			prio.setDiagnoser(getItemsByKoder(applicationData.getDiagnosKodList(), values[0]));

			TillstaandetsSvaarighetsgradKod svaarighetsgradKod = getByKod(
			        applicationData.getTillstaandetsSvaarighetsgradKodList(), values[2]);
			prio.setTillstaandetsSvaarighetsgradKod(svaarighetsgradKod);

			prio.setIndikationGaf(values[3]);

			prio.setAatgaerdskoder(getItemsByKoder(applicationData.getAatgaerdsKodList(), values[4]));

			prio.setAatgaerdsRiskKod(getByKod(applicationData.getAatgaerdsRiskKodList(), values[6]));

			prio.setPatientnyttaEffektAatgaerdsKod(getByKod(
			        applicationData.getPatientnyttaEffektAatgaerdsKodList(), values[7]));

			prio.setPatientnyttoEvidensKod(getByKod(applicationData.getPatientnyttoEvidensKodList(), values[8]));

			// prio.setQualy(toInt(values[9]));
			prio.setKostnadLevnadsaarKod(getByKod(applicationData.getKostnadLevnadsaarKodList(), values[9]));

			prio.setHaelsonekonomiskEvidensKod(getByKod(applicationData.getHaelsonekonomiskEvidensKodList(),
			        values[10]));

			prio.setVaentetidBehandlingVeckor(getByKod(applicationData.getVaentetidBehandlingVeckorList(),
			        values[11]));

			// prio.setVaentetidBesookVeckor(getByKod(applicationData.getVaentetidBesookVeckorList(), values[11]));

			prio.setVaardnivaaKod(getByKod(applicationData.getVaardnivaaKodList(), values[12]));

			prio.setVaardform(getByKod(applicationData.getVaardformsKodList(), values[13]));

			prio.setRangordningsKod(getByKod(applicationData.getRangordningsKodList(), values[14]));

			prio.setKommentar(values[15]);

			List<SektorRaad> raads = getFlattenedSektorRaads();

			prio.setSektorRaad(getById(raads, "10"));

			// 15 rang enligt formel... ska inte hårdkodas in.

			// if (values.length > 17) {
			// prio.setKommentar(values[17]);
			// }

			// mkPrioInsert(prio);

			prioRepository.store(prio);
			prioRepository.flush();

			TreeMap<String, Object> tm = new TreeMap<String, Object>(new BeanMap(prio));
			System.out.println(tm);

			hits++;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(row);
		}

	}

	private <T extends AbstractKod> T getById(List<T> codes, String sid) {
		Long id = toLong(sid);
		if (id == null) {
			System.out.println("Hej " + sid.trim());
			return null;
		}

		if (codes.isEmpty()) {
			throw new RuntimeException();
		}
		for (T ak : codes) {
			if (id.equals(ak.getId())) {
				return ak;
			}
		}
		System.out.println("Id " + id + " fanns ej.");
		return null;
	}

	private <T extends AbstractKod> T getByKod(List<T> codes, String kod) {
		kod = kod.replace(".", "");
		kod = kod.replace(" ", "");

		if (codes.isEmpty()) {
			throw new RuntimeException();
		}
		for (T ak : codes) {
			if (kod.equals(ak.getKod())) {
				return ak;
			}
		}
		return null;
	}

	private <T extends AbstractKod> Set<T> getItemsByKoder(List<T> codes, String kod) {
		String[] frags = kod.split(Pattern.quote(","));
		Set<T> result = new HashSet<T>();

		for (String k : frags) {
			if (k.contains("-")) {
				result.addAll(getItemsByKodInterval(codes, k));
			} else {
				T item = getByKod(codes, k);
				if (item != null) {
					result.add(item);
				}
			}
		}

		return result;
	}

	private <T extends AbstractKod> Set<T> getItemsByKodInterval(List<T> codes, String kod) {
		Set<T> result = new HashSet<T>();
		String[] fromTo = kod.split(Pattern.quote("-"));

		String charCode = fromTo[0].replaceAll("[0-9]", "");
		int start = toInt(fromTo[0]);
		int end = toInt(fromTo[1]);

		for (int i = start; i <= end; i++) {
			String code = charCode;
			if (i < 10) {
				code += "0";
			}
			code += i;
			T item = getByKod(codes, code);
			if (item != null) {
				result.add(item);
			}
		}
		return result;
	}

	private Integer toInt(String s) {
		if (s == null) {
			return null;
		}
		s = s.replaceAll("[^0-9]", "");
		while (s.startsWith("0")) {
			s = s.substring(1);
		}
		if ("".equals(s)) {
			return null;
		}
		return Integer.parseInt(s);
	}

	private Long toLong(String s) {
		if (s == null) {
			return null;
		}
		s = s.replaceAll("[^0-9]", "");
		while (s.startsWith("0")) {
			s = s.substring(1);
		}
		if ("".equals(s)) {
			return null;
		}
		return Long.parseLong(s);
	}

}
