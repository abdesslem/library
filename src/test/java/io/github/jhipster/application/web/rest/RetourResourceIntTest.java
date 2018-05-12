package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LibraryApp;

import io.github.jhipster.application.domain.Retour;
import io.github.jhipster.application.repository.RetourRepository;
import io.github.jhipster.application.service.dto.RetourDTO;
import io.github.jhipster.application.service.mapper.RetourMapper;
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
 * Test class for the RetourResource REST controller.
 *
 * @see RetourResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LibraryApp.class)
public class RetourResourceIntTest {

    private static final LocalDate DEFAULT_DATERETOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATERETOUR = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RetourRepository retourRepository;

    @Autowired
    private RetourMapper retourMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRetourMockMvc;

    private Retour retour;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RetourResource retourResource = new RetourResource(retourRepository, retourMapper);
        this.restRetourMockMvc = MockMvcBuilders.standaloneSetup(retourResource)
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
    public static Retour createEntity(EntityManager em) {
        Retour retour = new Retour()
            .dateretour(DEFAULT_DATERETOUR);
        return retour;
    }

    @Before
    public void initTest() {
        retour = createEntity(em);
    }

    @Test
    @Transactional
    public void createRetour() throws Exception {
        int databaseSizeBeforeCreate = retourRepository.findAll().size();

        // Create the Retour
        RetourDTO retourDTO = retourMapper.toDto(retour);
        restRetourMockMvc.perform(post("/api/retours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retourDTO)))
            .andExpect(status().isCreated());

        // Validate the Retour in the database
        List<Retour> retourList = retourRepository.findAll();
        assertThat(retourList).hasSize(databaseSizeBeforeCreate + 1);
        Retour testRetour = retourList.get(retourList.size() - 1);
        assertThat(testRetour.getDateretour()).isEqualTo(DEFAULT_DATERETOUR);
    }

    @Test
    @Transactional
    public void createRetourWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = retourRepository.findAll().size();

        // Create the Retour with an existing ID
        retour.setId(1L);
        RetourDTO retourDTO = retourMapper.toDto(retour);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRetourMockMvc.perform(post("/api/retours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retourDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Retour in the database
        List<Retour> retourList = retourRepository.findAll();
        assertThat(retourList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRetours() throws Exception {
        // Initialize the database
        retourRepository.saveAndFlush(retour);

        // Get all the retourList
        restRetourMockMvc.perform(get("/api/retours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(retour.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateretour").value(hasItem(DEFAULT_DATERETOUR.toString())));
    }

    @Test
    @Transactional
    public void getRetour() throws Exception {
        // Initialize the database
        retourRepository.saveAndFlush(retour);

        // Get the retour
        restRetourMockMvc.perform(get("/api/retours/{id}", retour.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(retour.getId().intValue()))
            .andExpect(jsonPath("$.dateretour").value(DEFAULT_DATERETOUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRetour() throws Exception {
        // Get the retour
        restRetourMockMvc.perform(get("/api/retours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRetour() throws Exception {
        // Initialize the database
        retourRepository.saveAndFlush(retour);
        int databaseSizeBeforeUpdate = retourRepository.findAll().size();

        // Update the retour
        Retour updatedRetour = retourRepository.findOne(retour.getId());
        // Disconnect from session so that the updates on updatedRetour are not directly saved in db
        em.detach(updatedRetour);
        updatedRetour
            .dateretour(UPDATED_DATERETOUR);
        RetourDTO retourDTO = retourMapper.toDto(updatedRetour);

        restRetourMockMvc.perform(put("/api/retours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retourDTO)))
            .andExpect(status().isOk());

        // Validate the Retour in the database
        List<Retour> retourList = retourRepository.findAll();
        assertThat(retourList).hasSize(databaseSizeBeforeUpdate);
        Retour testRetour = retourList.get(retourList.size() - 1);
        assertThat(testRetour.getDateretour()).isEqualTo(UPDATED_DATERETOUR);
    }

    @Test
    @Transactional
    public void updateNonExistingRetour() throws Exception {
        int databaseSizeBeforeUpdate = retourRepository.findAll().size();

        // Create the Retour
        RetourDTO retourDTO = retourMapper.toDto(retour);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRetourMockMvc.perform(put("/api/retours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(retourDTO)))
            .andExpect(status().isCreated());

        // Validate the Retour in the database
        List<Retour> retourList = retourRepository.findAll();
        assertThat(retourList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRetour() throws Exception {
        // Initialize the database
        retourRepository.saveAndFlush(retour);
        int databaseSizeBeforeDelete = retourRepository.findAll().size();

        // Get the retour
        restRetourMockMvc.perform(delete("/api/retours/{id}", retour.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Retour> retourList = retourRepository.findAll();
        assertThat(retourList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Retour.class);
        Retour retour1 = new Retour();
        retour1.setId(1L);
        Retour retour2 = new Retour();
        retour2.setId(retour1.getId());
        assertThat(retour1).isEqualTo(retour2);
        retour2.setId(2L);
        assertThat(retour1).isNotEqualTo(retour2);
        retour1.setId(null);
        assertThat(retour1).isNotEqualTo(retour2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RetourDTO.class);
        RetourDTO retourDTO1 = new RetourDTO();
        retourDTO1.setId(1L);
        RetourDTO retourDTO2 = new RetourDTO();
        assertThat(retourDTO1).isNotEqualTo(retourDTO2);
        retourDTO2.setId(retourDTO1.getId());
        assertThat(retourDTO1).isEqualTo(retourDTO2);
        retourDTO2.setId(2L);
        assertThat(retourDTO1).isNotEqualTo(retourDTO2);
        retourDTO1.setId(null);
        assertThat(retourDTO1).isNotEqualTo(retourDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(retourMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(retourMapper.fromId(null)).isNull();
    }
}
