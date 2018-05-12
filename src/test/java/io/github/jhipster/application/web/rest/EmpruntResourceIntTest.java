package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LibraryApp;

import io.github.jhipster.application.domain.Emprunt;
import io.github.jhipster.application.repository.EmpruntRepository;
import io.github.jhipster.application.service.dto.EmpruntDTO;
import io.github.jhipster.application.service.mapper.EmpruntMapper;
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
 * Test class for the EmpruntResource REST controller.
 *
 * @see EmpruntResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryApp.class)
public class EmpruntResourceIntTest {

    private static final LocalDate DEFAULT_DATEEMPRUNT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEEMPRUNT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATERETOURLIMITE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATERETOURLIMITE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EmpruntRepository empruntRepository;

    @Autowired
    private EmpruntMapper empruntMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmpruntMockMvc;

    private Emprunt emprunt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmpruntResource empruntResource = new EmpruntResource(empruntRepository, empruntMapper);
        this.restEmpruntMockMvc = MockMvcBuilders.standaloneSetup(empruntResource)
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
    public static Emprunt createEntity(EntityManager em) {
        Emprunt emprunt = new Emprunt()
            .dateemprunt(DEFAULT_DATEEMPRUNT)
            .dateretourlimite(DEFAULT_DATERETOURLIMITE);
        return emprunt;
    }

    @Before
    public void initTest() {
        emprunt = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmprunt() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();

        // Create the Emprunt
        EmpruntDTO empruntDTO = empruntMapper.toDto(emprunt);
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empruntDTO)))
            .andExpect(status().isCreated());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate + 1);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getDateemprunt()).isEqualTo(DEFAULT_DATEEMPRUNT);
        assertThat(testEmprunt.getDateretourlimite()).isEqualTo(DEFAULT_DATERETOURLIMITE);
    }

    @Test
    @Transactional
    public void createEmpruntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();

        // Create the Emprunt with an existing ID
        emprunt.setId(1L);
        EmpruntDTO empruntDTO = empruntMapper.toDto(emprunt);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empruntDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmprunts() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get all the empruntList
        restEmpruntMockMvc.perform(get("/api/emprunts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emprunt.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateemprunt").value(hasItem(DEFAULT_DATEEMPRUNT.toString())))
            .andExpect(jsonPath("$.[*].dateretourlimite").value(hasItem(DEFAULT_DATERETOURLIMITE.toString())));
    }

    @Test
    @Transactional
    public void getEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", emprunt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emprunt.getId().intValue()))
            .andExpect(jsonPath("$.dateemprunt").value(DEFAULT_DATEEMPRUNT.toString()))
            .andExpect(jsonPath("$.dateretourlimite").value(DEFAULT_DATERETOURLIMITE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmprunt() throws Exception {
        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);
        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // Update the emprunt
        Emprunt updatedEmprunt = empruntRepository.findOne(emprunt.getId());
        // Disconnect from session so that the updates on updatedEmprunt are not directly saved in db
        em.detach(updatedEmprunt);
        updatedEmprunt
            .dateemprunt(UPDATED_DATEEMPRUNT)
            .dateretourlimite(UPDATED_DATERETOURLIMITE);
        EmpruntDTO empruntDTO = empruntMapper.toDto(updatedEmprunt);

        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empruntDTO)))
            .andExpect(status().isOk());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getDateemprunt()).isEqualTo(UPDATED_DATEEMPRUNT);
        assertThat(testEmprunt.getDateretourlimite()).isEqualTo(UPDATED_DATERETOURLIMITE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmprunt() throws Exception {
        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // Create the Emprunt
        EmpruntDTO empruntDTO = empruntMapper.toDto(emprunt);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empruntDTO)))
            .andExpect(status().isCreated());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);
        int databaseSizeBeforeDelete = empruntRepository.findAll().size();

        // Get the emprunt
        restEmpruntMockMvc.perform(delete("/api/emprunts/{id}", emprunt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Emprunt.class);
        Emprunt emprunt1 = new Emprunt();
        emprunt1.setId(1L);
        Emprunt emprunt2 = new Emprunt();
        emprunt2.setId(emprunt1.getId());
        assertThat(emprunt1).isEqualTo(emprunt2);
        emprunt2.setId(2L);
        assertThat(emprunt1).isNotEqualTo(emprunt2);
        emprunt1.setId(null);
        assertThat(emprunt1).isNotEqualTo(emprunt2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmpruntDTO.class);
        EmpruntDTO empruntDTO1 = new EmpruntDTO();
        empruntDTO1.setId(1L);
        EmpruntDTO empruntDTO2 = new EmpruntDTO();
        assertThat(empruntDTO1).isNotEqualTo(empruntDTO2);
        empruntDTO2.setId(empruntDTO1.getId());
        assertThat(empruntDTO1).isEqualTo(empruntDTO2);
        empruntDTO2.setId(2L);
        assertThat(empruntDTO1).isNotEqualTo(empruntDTO2);
        empruntDTO1.setId(null);
        assertThat(empruntDTO1).isNotEqualTo(empruntDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(empruntMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(empruntMapper.fromId(null)).isNull();
    }
}
