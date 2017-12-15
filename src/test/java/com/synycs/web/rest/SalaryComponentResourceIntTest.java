package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.SalaryComponent;
import com.synycs.repository.SalaryComponentRepository;
import com.synycs.service.SalaryComponentService;
import com.synycs.service.dto.SalaryComponentDTO;
import com.synycs.service.mapper.SalaryComponentMapper;
import com.synycs.web.rest.errors.ExceptionTranslator;

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

import static com.synycs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SalaryComponentResource REST controller.
 *
 * @see SalaryComponentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class SalaryComponentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_GROSS_PERCENT = 1D;
    private static final Double UPDATED_GROSS_PERCENT = 2D;

    private static final LocalDate DEFAULT_DATE_OF_JOINING = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OF_JOINING = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_DEDUCTION = false;
    private static final Boolean UPDATED_DEDUCTION = true;

    @Autowired
    private SalaryComponentRepository salaryComponentRepository;

    @Autowired
    private SalaryComponentMapper salaryComponentMapper;

    @Autowired
    private SalaryComponentService salaryComponentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSalaryComponentMockMvc;

    private SalaryComponent salaryComponent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalaryComponentResource salaryComponentResource = new SalaryComponentResource(salaryComponentService);
        this.restSalaryComponentMockMvc = MockMvcBuilders.standaloneSetup(salaryComponentResource)
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
    public static SalaryComponent createEntity(EntityManager em) {
        SalaryComponent salaryComponent = new SalaryComponent()
            .name(DEFAULT_NAME)
            .grossPercent(DEFAULT_GROSS_PERCENT)
            .dateOfJoining(DEFAULT_DATE_OF_JOINING)
            .deduction(DEFAULT_DEDUCTION);
        return salaryComponent;
    }

    @Before
    public void initTest() {
        salaryComponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalaryComponent() throws Exception {
        int databaseSizeBeforeCreate = salaryComponentRepository.findAll().size();

        // Create the SalaryComponent
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);
        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isCreated());

        // Validate the SalaryComponent in the database
        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeCreate + 1);
        SalaryComponent testSalaryComponent = salaryComponentList.get(salaryComponentList.size() - 1);
        assertThat(testSalaryComponent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSalaryComponent.getGrossPercent()).isEqualTo(DEFAULT_GROSS_PERCENT);
        assertThat(testSalaryComponent.getDateOfJoining()).isEqualTo(DEFAULT_DATE_OF_JOINING);
        assertThat(testSalaryComponent.isDeduction()).isEqualTo(DEFAULT_DEDUCTION);
    }

    @Test
    @Transactional
    public void createSalaryComponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salaryComponentRepository.findAll().size();

        // Create the SalaryComponent with an existing ID
        salaryComponent.setId(1L);
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SalaryComponent in the database
        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryComponentRepository.findAll().size();
        // set the field null
        salaryComponent.setName(null);

        // Create the SalaryComponent, which fails.
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isBadRequest());

        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGrossPercentIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryComponentRepository.findAll().size();
        // set the field null
        salaryComponent.setGrossPercent(null);

        // Create the SalaryComponent, which fails.
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isBadRequest());

        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfJoiningIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryComponentRepository.findAll().size();
        // set the field null
        salaryComponent.setDateOfJoining(null);

        // Create the SalaryComponent, which fails.
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isBadRequest());

        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeductionIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryComponentRepository.findAll().size();
        // set the field null
        salaryComponent.setDeduction(null);

        // Create the SalaryComponent, which fails.
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        restSalaryComponentMockMvc.perform(post("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isBadRequest());

        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalaryComponents() throws Exception {
        // Initialize the database
        salaryComponentRepository.saveAndFlush(salaryComponent);

        // Get all the salaryComponentList
        restSalaryComponentMockMvc.perform(get("/api/salary-components?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salaryComponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].grossPercent").value(hasItem(DEFAULT_GROSS_PERCENT.doubleValue())))
            .andExpect(jsonPath("$.[*].dateOfJoining").value(hasItem(DEFAULT_DATE_OF_JOINING.toString())))
            .andExpect(jsonPath("$.[*].deduction").value(hasItem(DEFAULT_DEDUCTION.booleanValue())));
    }

    @Test
    @Transactional
    public void getSalaryComponent() throws Exception {
        // Initialize the database
        salaryComponentRepository.saveAndFlush(salaryComponent);

        // Get the salaryComponent
        restSalaryComponentMockMvc.perform(get("/api/salary-components/{id}", salaryComponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salaryComponent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.grossPercent").value(DEFAULT_GROSS_PERCENT.doubleValue()))
            .andExpect(jsonPath("$.dateOfJoining").value(DEFAULT_DATE_OF_JOINING.toString()))
            .andExpect(jsonPath("$.deduction").value(DEFAULT_DEDUCTION.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSalaryComponent() throws Exception {
        // Get the salaryComponent
        restSalaryComponentMockMvc.perform(get("/api/salary-components/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalaryComponent() throws Exception {
        // Initialize the database
        salaryComponentRepository.saveAndFlush(salaryComponent);
        int databaseSizeBeforeUpdate = salaryComponentRepository.findAll().size();

        // Update the salaryComponent
        SalaryComponent updatedSalaryComponent = salaryComponentRepository.findOne(salaryComponent.getId());
        // Disconnect from session so that the updates on updatedSalaryComponent are not directly saved in db
        em.detach(updatedSalaryComponent);
        updatedSalaryComponent
            .name(UPDATED_NAME)
            .grossPercent(UPDATED_GROSS_PERCENT)
            .dateOfJoining(UPDATED_DATE_OF_JOINING)
            .deduction(UPDATED_DEDUCTION);
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(updatedSalaryComponent);

        restSalaryComponentMockMvc.perform(put("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isOk());

        // Validate the SalaryComponent in the database
        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeUpdate);
        SalaryComponent testSalaryComponent = salaryComponentList.get(salaryComponentList.size() - 1);
        assertThat(testSalaryComponent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSalaryComponent.getGrossPercent()).isEqualTo(UPDATED_GROSS_PERCENT);
        assertThat(testSalaryComponent.getDateOfJoining()).isEqualTo(UPDATED_DATE_OF_JOINING);
        assertThat(testSalaryComponent.isDeduction()).isEqualTo(UPDATED_DEDUCTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSalaryComponent() throws Exception {
        int databaseSizeBeforeUpdate = salaryComponentRepository.findAll().size();

        // Create the SalaryComponent
        SalaryComponentDTO salaryComponentDTO = salaryComponentMapper.toDto(salaryComponent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSalaryComponentMockMvc.perform(put("/api/salary-components")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salaryComponentDTO)))
            .andExpect(status().isCreated());

        // Validate the SalaryComponent in the database
        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSalaryComponent() throws Exception {
        // Initialize the database
        salaryComponentRepository.saveAndFlush(salaryComponent);
        int databaseSizeBeforeDelete = salaryComponentRepository.findAll().size();

        // Get the salaryComponent
        restSalaryComponentMockMvc.perform(delete("/api/salary-components/{id}", salaryComponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SalaryComponent> salaryComponentList = salaryComponentRepository.findAll();
        assertThat(salaryComponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalaryComponent.class);
        SalaryComponent salaryComponent1 = new SalaryComponent();
        salaryComponent1.setId(1L);
        SalaryComponent salaryComponent2 = new SalaryComponent();
        salaryComponent2.setId(salaryComponent1.getId());
        assertThat(salaryComponent1).isEqualTo(salaryComponent2);
        salaryComponent2.setId(2L);
        assertThat(salaryComponent1).isNotEqualTo(salaryComponent2);
        salaryComponent1.setId(null);
        assertThat(salaryComponent1).isNotEqualTo(salaryComponent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalaryComponentDTO.class);
        SalaryComponentDTO salaryComponentDTO1 = new SalaryComponentDTO();
        salaryComponentDTO1.setId(1L);
        SalaryComponentDTO salaryComponentDTO2 = new SalaryComponentDTO();
        assertThat(salaryComponentDTO1).isNotEqualTo(salaryComponentDTO2);
        salaryComponentDTO2.setId(salaryComponentDTO1.getId());
        assertThat(salaryComponentDTO1).isEqualTo(salaryComponentDTO2);
        salaryComponentDTO2.setId(2L);
        assertThat(salaryComponentDTO1).isNotEqualTo(salaryComponentDTO2);
        salaryComponentDTO1.setId(null);
        assertThat(salaryComponentDTO1).isNotEqualTo(salaryComponentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(salaryComponentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(salaryComponentMapper.fromId(null)).isNull();
    }
}
