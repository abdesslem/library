package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LibraryApp;

import io.github.jhipster.application.domain.Abonne;
import io.github.jhipster.application.repository.AbonneRepository;
import io.github.jhipster.application.service.dto.AbonneDTO;
import io.github.jhipster.application.service.mapper.AbonneMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AbonneResource REST controller.
 *
 * @see AbonneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryApp.class)
public class AbonneResourceIntTest {

    private static final Integer DEFAULT_NCIN = 1;
    private static final Integer UPDATED_NCIN = 2;

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATENAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATENAISSANCE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AbonneRepository abonneRepository;

    @Autowired
    private AbonneMapper abonneMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAbonneMockMvc;

    private Abonne abonne;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AbonneResource abonneResource = new AbonneResource(abonneRepository, abonneMapper);
        this.restAbonneMockMvc = MockMvcBuilders.standaloneSetup(abonneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abonne createEntity(EntityManager em) {
        Abonne abonne = new Abonne()
            .ncin(DEFAULT_NCIN)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .datenaissance(DEFAULT_DATENAISSANCE);
        return abonne;
    }

    @Before
    public void initTest() {
        abonne = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbonne() throws Exception {
        int databaseSizeBeforeCreate = abonneRepository.findAll().size();

        // Create the Abonne
        AbonneDTO abonneDTO = abonneMapper.toDto(abonne);
        restAbonneMockMvc.perform(post("/api/abonnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(abonneDTO)))
            .andExpect(status().isCreated());

        // Validate the Abonne in the database
        List<Abonne> abonneList = abonneRepository.findAll();
        assertThat(abonneList).hasSize(databaseSizeBeforeCreate + 1);
        Abonne testAbonne = abonneList.get(abonneList.size() - 1);
        assertThat(testAbonne.getNcin()).isEqualTo(DEFAULT_NCIN);
        assertThat(testAbonne.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAbonne.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testAbonne.getDatenaissance()).isEqualTo(DEFAULT_DATENAISSANCE);
    }

    @Test
    @Transactional
    public void createAbonneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = abonneRepository.findAll().size();

        // Create the Abonne with an existing ID
        abonne.setId(1L);
        AbonneDTO abonneDTO = abonneMapper.toDto(abonne);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbonneMockMvc.perform(post("/api/abonnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(abonneDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Abonne in the database
        List<Abonne> abonneList = abonneRepository.findAll();
        assertThat(abonneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAbonnes() throws Exception {
        // Initialize the database
        abonneRepository.saveAndFlush(abonne);

        // Get all the abonneList
        restAbonneMockMvc.perform(get("/api/abonnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(abonne.getId().intValue())))
            .andExpect(jsonPath("$.[*].ncin").value(hasItem(DEFAULT_NCIN)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].datenaissance").value(hasItem(DEFAULT_DATENAISSANCE.toString())));
    }

    @Test
    @Transactional
    public void getAbonne() throws Exception {
        // Initialize the database
        abonneRepository.saveAndFlush(abonne);

        // Get the abonne
        restAbonneMockMvc.perform(get("/api/abonnes/{id}", abonne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(abonne.getId().intValue()))
            .andExpect(jsonPath("$.ncin").value(DEFAULT_NCIN))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.datenaissance").value(DEFAULT_DATENAISSANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAbonne() throws Exception {
        // Get the abonne
        restAbonneMockMvc.perform(get("/api/abonnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbonne() throws Exception {
        // Initialize the database
        abonneRepository.saveAndFlush(abonne);
        int databaseSizeBeforeUpdate = abonneRepository.findAll().size();

        // Update the abonne
        Abonne updatedAbonne = abonneRepository.findOne(abonne.getId());
        // Disconnect from session so that the updates on updatedAbonne are not directly saved in db
        em.detach(updatedAbonne);
        updatedAbonne
            .ncin(UPDATED_NCIN)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .datenaissance(UPDATED_DATENAISSANCE);
        AbonneDTO abonneDTO = abonneMapper.toDto(updatedAbonne);

        restAbonneMockMvc.perform(put("/api/abonnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(abonneDTO)))
            .andExpect(status().isOk());

        // Validate the Abonne in the database
        List<Abonne> abonneList = abonneRepository.findAll();
        assertThat(abonneList).hasSize(databaseSizeBeforeUpdate);
        Abonne testAbonne = abonneList.get(abonneList.size() - 1);
        assertThat(testAbonne.getNcin()).isEqualTo(UPDATED_NCIN);
        assertThat(testAbonne.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAbonne.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testAbonne.getDatenaissance()).isEqualTo(UPDATED_DATENAISSANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingAbonne() throws Exception {
        int databaseSizeBeforeUpdate = abonneRepository.findAll().size();

        // Create the Abonne
        AbonneDTO abonneDTO = abonneMapper.toDto(abonne);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAbonneMockMvc.perform(put("/api/abonnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(abonneDTO)))
            .andExpect(status().isCreated());

        // Validate the Abonne in the database
        List<Abonne> abonneList = abonneRepository.findAll();
        assertThat(abonneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAbonne() throws Exception {
        // Initialize the database
        abonneRepository.saveAndFlush(abonne);
        int databaseSizeBeforeDelete = abonneRepository.findAll().size();

        // Get the abonne
        restAbonneMockMvc.perform(delete("/api/abonnes/{id}", abonne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Abonne> abonneList = abonneRepository.findAll();
        assertThat(abonneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Abonne.class);
        Abonne abonne1 = new Abonne();
        abonne1.setId(1L);
        Abonne abonne2 = new Abonne();
        abonne2.setId(abonne1.getId());
        assertThat(abonne1).isEqualTo(abonne2);
        abonne2.setId(2L);
        assertThat(abonne1).isNotEqualTo(abonne2);
        abonne1.setId(null);
        assertThat(abonne1).isNotEqualTo(abonne2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AbonneDTO.class);
        AbonneDTO abonneDTO1 = new AbonneDTO();
        abonneDTO1.setId(1L);
        AbonneDTO abonneDTO2 = new AbonneDTO();
        assertThat(abonneDTO1).isNotEqualTo(abonneDTO2);
        abonneDTO2.setId(abonneDTO1.getId());
        assertThat(abonneDTO1).isEqualTo(abonneDTO2);
        abonneDTO2.setId(2L);
        assertThat(abonneDTO1).isNotEqualTo(abonneDTO2);
        abonneDTO1.setId(null);
        assertThat(abonneDTO1).isNotEqualTo(abonneDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(abonneMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(abonneMapper.fromId(null)).isNull();
    }
}
