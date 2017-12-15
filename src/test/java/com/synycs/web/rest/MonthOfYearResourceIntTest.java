package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.MonthOfYear;
import com.synycs.repository.MonthOfYearRepository;
import com.synycs.service.dto.MonthOfYearDTO;
import com.synycs.service.mapper.MonthOfYearMapper;
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
import java.util.List;

import static com.synycs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MonthOfYearResource REST controller.
 *
 * @see MonthOfYearResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class MonthOfYearResourceIntTest {

    private static final Long DEFAULT_YEAR = 1L;
    private static final Long UPDATED_YEAR = 2L;

    private static final Long DEFAULT_MONTH = 1L;
    private static final Long UPDATED_MONTH = 2L;

    @Autowired
    private MonthOfYearRepository monthOfYearRepository;

    @Autowired
    private MonthOfYearMapper monthOfYearMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMonthOfYearMockMvc;

    private MonthOfYear monthOfYear;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MonthOfYearResource monthOfYearResource = new MonthOfYearResource(monthOfYearRepository, monthOfYearMapper);
        this.restMonthOfYearMockMvc = MockMvcBuilders.standaloneSetup(monthOfYearResource)
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
    public static MonthOfYear createEntity(EntityManager em) {
        MonthOfYear monthOfYear = new MonthOfYear()
            .year(DEFAULT_YEAR)
            .month(DEFAULT_MONTH);
        return monthOfYear;
    }

    @Before
    public void initTest() {
        monthOfYear = createEntity(em);
    }

    @Test
    @Transactional
    public void createMonthOfYear() throws Exception {
        int databaseSizeBeforeCreate = monthOfYearRepository.findAll().size();

        // Create the MonthOfYear
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);
        restMonthOfYearMockMvc.perform(post("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isCreated());

        // Validate the MonthOfYear in the database
        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeCreate + 1);
        MonthOfYear testMonthOfYear = monthOfYearList.get(monthOfYearList.size() - 1);
        assertThat(testMonthOfYear.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testMonthOfYear.getMonth()).isEqualTo(DEFAULT_MONTH);
    }

    @Test
    @Transactional
    public void createMonthOfYearWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = monthOfYearRepository.findAll().size();

        // Create the MonthOfYear with an existing ID
        monthOfYear.setId(1L);
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMonthOfYearMockMvc.perform(post("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MonthOfYear in the database
        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = monthOfYearRepository.findAll().size();
        // set the field null
        monthOfYear.setYear(null);

        // Create the MonthOfYear, which fails.
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);

        restMonthOfYearMockMvc.perform(post("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isBadRequest());

        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = monthOfYearRepository.findAll().size();
        // set the field null
        monthOfYear.setMonth(null);

        // Create the MonthOfYear, which fails.
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);

        restMonthOfYearMockMvc.perform(post("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isBadRequest());

        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMonthOfYears() throws Exception {
        // Initialize the database
        monthOfYearRepository.saveAndFlush(monthOfYear);

        // Get all the monthOfYearList
        restMonthOfYearMockMvc.perform(get("/api/month-of-years?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(monthOfYear.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.intValue())))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.intValue())));
    }

    @Test
    @Transactional
    public void getMonthOfYear() throws Exception {
        // Initialize the database
        monthOfYearRepository.saveAndFlush(monthOfYear);

        // Get the monthOfYear
        restMonthOfYearMockMvc.perform(get("/api/month-of-years/{id}", monthOfYear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(monthOfYear.getId().intValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.intValue()))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMonthOfYear() throws Exception {
        // Get the monthOfYear
        restMonthOfYearMockMvc.perform(get("/api/month-of-years/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMonthOfYear() throws Exception {
        // Initialize the database
        monthOfYearRepository.saveAndFlush(monthOfYear);
        int databaseSizeBeforeUpdate = monthOfYearRepository.findAll().size();

        // Update the monthOfYear
        MonthOfYear updatedMonthOfYear = monthOfYearRepository.findOne(monthOfYear.getId());
        // Disconnect from session so that the updates on updatedMonthOfYear are not directly saved in db
        em.detach(updatedMonthOfYear);
        updatedMonthOfYear
            .year(UPDATED_YEAR)
            .month(UPDATED_MONTH);
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(updatedMonthOfYear);

        restMonthOfYearMockMvc.perform(put("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isOk());

        // Validate the MonthOfYear in the database
        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeUpdate);
        MonthOfYear testMonthOfYear = monthOfYearList.get(monthOfYearList.size() - 1);
        assertThat(testMonthOfYear.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testMonthOfYear.getMonth()).isEqualTo(UPDATED_MONTH);
    }

    @Test
    @Transactional
    public void updateNonExistingMonthOfYear() throws Exception {
        int databaseSizeBeforeUpdate = monthOfYearRepository.findAll().size();

        // Create the MonthOfYear
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMonthOfYearMockMvc.perform(put("/api/month-of-years")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(monthOfYearDTO)))
            .andExpect(status().isCreated());

        // Validate the MonthOfYear in the database
        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMonthOfYear() throws Exception {
        // Initialize the database
        monthOfYearRepository.saveAndFlush(monthOfYear);
        int databaseSizeBeforeDelete = monthOfYearRepository.findAll().size();

        // Get the monthOfYear
        restMonthOfYearMockMvc.perform(delete("/api/month-of-years/{id}", monthOfYear.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MonthOfYear> monthOfYearList = monthOfYearRepository.findAll();
        assertThat(monthOfYearList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MonthOfYear.class);
        MonthOfYear monthOfYear1 = new MonthOfYear();
        monthOfYear1.setId(1L);
        MonthOfYear monthOfYear2 = new MonthOfYear();
        monthOfYear2.setId(monthOfYear1.getId());
        assertThat(monthOfYear1).isEqualTo(monthOfYear2);
        monthOfYear2.setId(2L);
        assertThat(monthOfYear1).isNotEqualTo(monthOfYear2);
        monthOfYear1.setId(null);
        assertThat(monthOfYear1).isNotEqualTo(monthOfYear2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MonthOfYearDTO.class);
        MonthOfYearDTO monthOfYearDTO1 = new MonthOfYearDTO();
        monthOfYearDTO1.setId(1L);
        MonthOfYearDTO monthOfYearDTO2 = new MonthOfYearDTO();
        assertThat(monthOfYearDTO1).isNotEqualTo(monthOfYearDTO2);
        monthOfYearDTO2.setId(monthOfYearDTO1.getId());
        assertThat(monthOfYearDTO1).isEqualTo(monthOfYearDTO2);
        monthOfYearDTO2.setId(2L);
        assertThat(monthOfYearDTO1).isNotEqualTo(monthOfYearDTO2);
        monthOfYearDTO1.setId(null);
        assertThat(monthOfYearDTO1).isNotEqualTo(monthOfYearDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(monthOfYearMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(monthOfYearMapper.fromId(null)).isNull();
    }
}
