package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LibraryApp;

import io.github.jhipster.application.domain.Administrateur;
import io.github.jhipster.application.repository.AdministrateurRepository;
import io.github.jhipster.application.service.dto.AdministrateurDTO;
import io.github.jhipster.application.service.mapper.AdministrateurMapper;
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
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AdministrateurResource REST controller.
 *
 * @see AdministrateurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryApp.class)
public class AdministrateurResourceIntTest {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_MDP = "AAAAAAAAAA";
    private static final String UPDATED_MDP = "BBBBBBBBBB";

    private static final String DEFAULT_FIRSTNAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRSTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_LASTNAME = "AAAAAAAAAA";
    private static final String UPDATED_LASTNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private AdministrateurRepository administrateurRepository;

    @Autowired
    private AdministrateurMapper administrateurMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdministrateurMockMvc;

    private Administrateur administrateur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdministrateurResource administrateurResource = new AdministrateurResource(administrateurRepository, administrateurMapper);
        this.restAdministrateurMockMvc = MockMvcBuilders.standaloneSetup(administrateurResource)
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
    public static Administrateur createEntity(EntityManager em) {
        Administrateur administrateur = new Administrateur()
            .login(DEFAULT_LOGIN)
            .mdp(DEFAULT_MDP)
            .firstname(DEFAULT_FIRSTNAME)
            .lastname(DEFAULT_LASTNAME)
            .email(DEFAULT_EMAIL)
            .adresse(DEFAULT_ADRESSE);
        return administrateur;
    }

    @Before
    public void initTest() {
        administrateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdministrateur() throws Exception {
        int databaseSizeBeforeCreate = administrateurRepository.findAll().size();

        // Create the Administrateur
        AdministrateurDTO administrateurDTO = administrateurMapper.toDto(administrateur);
        restAdministrateurMockMvc.perform(post("/api/administrateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Administrateur in the database
        List<Administrateur> administrateurList = administrateurRepository.findAll();
        assertThat(administrateurList).hasSize(databaseSizeBeforeCreate + 1);
        Administrateur testAdministrateur = administrateurList.get(administrateurList.size() - 1);
        assertThat(testAdministrateur.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testAdministrateur.getMdp()).isEqualTo(DEFAULT_MDP);
        assertThat(testAdministrateur.getFirstname()).isEqualTo(DEFAULT_FIRSTNAME);
        assertThat(testAdministrateur.getLastname()).isEqualTo(DEFAULT_LASTNAME);
        assertThat(testAdministrateur.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAdministrateur.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    public void createAdministrateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = administrateurRepository.findAll().size();

        // Create the Administrateur with an existing ID
        administrateur.setId(1L);
        AdministrateurDTO administrateurDTO = administrateurMapper.toDto(administrateur);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdministrateurMockMvc.perform(post("/api/administrateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrateurDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Administrateur in the database
        List<Administrateur> administrateurList = administrateurRepository.findAll();
        assertThat(administrateurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAdministrateurs() throws Exception {
        // Initialize the database
        administrateurRepository.saveAndFlush(administrateur);

        // Get all the administrateurList
        restAdministrateurMockMvc.perform(get("/api/administrateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].mdp").value(hasItem(DEFAULT_MDP.toString())))
            .andExpect(jsonPath("$.[*].firstname").value(hasItem(DEFAULT_FIRSTNAME.toString())))
            .andExpect(jsonPath("$.[*].lastname").value(hasItem(DEFAULT_LASTNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())));
    }

    @Test
    @Transactional
    public void getAdministrateur() throws Exception {
        // Initialize the database
        administrateurRepository.saveAndFlush(administrateur);

        // Get the administrateur
        restAdministrateurMockMvc.perform(get("/api/administrateurs/{id}", administrateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(administrateur.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.mdp").value(DEFAULT_MDP.toString()))
            .andExpect(jsonPath("$.firstname").value(DEFAULT_FIRSTNAME.toString()))
            .andExpect(jsonPath("$.lastname").value(DEFAULT_LASTNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAdministrateur() throws Exception {
        // Get the administrateur
        restAdministrateurMockMvc.perform(get("/api/administrateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdministrateur() throws Exception {
        // Initialize the database
        administrateurRepository.saveAndFlush(administrateur);
        int databaseSizeBeforeUpdate = administrateurRepository.findAll().size();

        // Update the administrateur
        Administrateur updatedAdministrateur = administrateurRepository.findOne(administrateur.getId());
        // Disconnect from session so that the updates on updatedAdministrateur are not directly saved in db
        em.detach(updatedAdministrateur);
        updatedAdministrateur
            .login(UPDATED_LOGIN)
            .mdp(UPDATED_MDP)
            .firstname(UPDATED_FIRSTNAME)
            .lastname(UPDATED_LASTNAME)
            .email(UPDATED_EMAIL)
            .adresse(UPDATED_ADRESSE);
        AdministrateurDTO administrateurDTO = administrateurMapper.toDto(updatedAdministrateur);

        restAdministrateurMockMvc.perform(put("/api/administrateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrateurDTO)))
            .andExpect(status().isOk());

        // Validate the Administrateur in the database
        List<Administrateur> administrateurList = administrateurRepository.findAll();
        assertThat(administrateurList).hasSize(databaseSizeBeforeUpdate);
        Administrateur testAdministrateur = administrateurList.get(administrateurList.size() - 1);
        assertThat(testAdministrateur.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testAdministrateur.getMdp()).isEqualTo(UPDATED_MDP);
        assertThat(testAdministrateur.getFirstname()).isEqualTo(UPDATED_FIRSTNAME);
        assertThat(testAdministrateur.getLastname()).isEqualTo(UPDATED_LASTNAME);
        assertThat(testAdministrateur.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAdministrateur.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    public void updateNonExistingAdministrateur() throws Exception {
        int databaseSizeBeforeUpdate = administrateurRepository.findAll().size();

        // Create the Administrateur
        AdministrateurDTO administrateurDTO = administrateurMapper.toDto(administrateur);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAdministrateurMockMvc.perform(put("/api/administrateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrateurDTO)))
            .andExpect(status().isCreated());

        // Validate the Administrateur in the database
        List<Administrateur> administrateurList = administrateurRepository.findAll();
        assertThat(administrateurList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAdministrateur() throws Exception {
        // Initialize the database
        administrateurRepository.saveAndFlush(administrateur);
        int databaseSizeBeforeDelete = administrateurRepository.findAll().size();

        // Get the administrateur
        restAdministrateurMockMvc.perform(delete("/api/administrateurs/{id}", administrateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Administrateur> administrateurList = administrateurRepository.findAll();
        assertThat(administrateurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Administrateur.class);
        Administrateur administrateur1 = new Administrateur();
        administrateur1.setId(1L);
        Administrateur administrateur2 = new Administrateur();
        administrateur2.setId(administrateur1.getId());
        assertThat(administrateur1).isEqualTo(administrateur2);
        administrateur2.setId(2L);
        assertThat(administrateur1).isNotEqualTo(administrateur2);
        administrateur1.setId(null);
        assertThat(administrateur1).isNotEqualTo(administrateur2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AdministrateurDTO.class);
        AdministrateurDTO administrateurDTO1 = new AdministrateurDTO();
        administrateurDTO1.setId(1L);
        AdministrateurDTO administrateurDTO2 = new AdministrateurDTO();
        assertThat(administrateurDTO1).isNotEqualTo(administrateurDTO2);
        administrateurDTO2.setId(administrateurDTO1.getId());
        assertThat(administrateurDTO1).isEqualTo(administrateurDTO2);
        administrateurDTO2.setId(2L);
        assertThat(administrateurDTO1).isNotEqualTo(administrateurDTO2);
        administrateurDTO1.setId(null);
        assertThat(administrateurDTO1).isNotEqualTo(administrateurDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(administrateurMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(administrateurMapper.fromId(null)).isNull();
    }
}
