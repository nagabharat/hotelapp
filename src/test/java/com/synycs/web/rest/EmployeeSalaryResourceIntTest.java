package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.EmployeeSalary;
import com.synycs.repository.EmployeeSalaryRepository;
import com.synycs.service.EmployeeSalaryService;
import com.synycs.service.dto.EmployeeSalaryDTO;
import com.synycs.service.mapper.EmployeeSalaryMapper;
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
 * Test class for the EmployeeSalaryResource REST controller.
 *
 * @see EmployeeSalaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class EmployeeSalaryResourceIntTest {

    private static final Double DEFAULT_GROSS = 1D;
    private static final Double UPDATED_GROSS = 2D;

    @Autowired
    private EmployeeSalaryRepository employeeSalaryRepository;

    @Autowired
    private EmployeeSalaryMapper employeeSalaryMapper;

    @Autowired
    private EmployeeSalaryService employeeSalaryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeeSalaryMockMvc;

    private EmployeeSalary employeeSalary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeSalaryResource employeeSalaryResource = new EmployeeSalaryResource(employeeSalaryService);
        this.restEmployeeSalaryMockMvc = MockMvcBuilders.standaloneSetup(employeeSalaryResource)
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
    public static EmployeeSalary createEntity(EntityManager em) {
        EmployeeSalary employeeSalary = new EmployeeSalary()
            .gross(DEFAULT_GROSS);
        return employeeSalary;
    }

    @Before
    public void initTest() {
        employeeSalary = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeSalary() throws Exception {
        int databaseSizeBeforeCreate = employeeSalaryRepository.findAll().size();

        // Create the EmployeeSalary
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryMapper.toDto(employeeSalary);
        restEmployeeSalaryMockMvc.perform(post("/api/employee-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalaryDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeSalary in the database
        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeSalary testEmployeeSalary = employeeSalaryList.get(employeeSalaryList.size() - 1);
        assertThat(testEmployeeSalary.getGross()).isEqualTo(DEFAULT_GROSS);
    }

    @Test
    @Transactional
    public void createEmployeeSalaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeSalaryRepository.findAll().size();

        // Create the EmployeeSalary with an existing ID
        employeeSalary.setId(1L);
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryMapper.toDto(employeeSalary);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeSalaryMockMvc.perform(post("/api/employee-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalaryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSalary in the database
        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGrossIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeSalaryRepository.findAll().size();
        // set the field null
        employeeSalary.setGross(null);

        // Create the EmployeeSalary, which fails.
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryMapper.toDto(employeeSalary);

        restEmployeeSalaryMockMvc.perform(post("/api/employee-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalaryDTO)))
            .andExpect(status().isBadRequest());

        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployeeSalaries() throws Exception {
        // Initialize the database
        employeeSalaryRepository.saveAndFlush(employeeSalary);

        // Get all the employeeSalaryList
        restEmployeeSalaryMockMvc.perform(get("/api/employee-salaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeSalary.getId().intValue())))
            .andExpect(jsonPath("$.[*].gross").value(hasItem(DEFAULT_GROSS.doubleValue())));
    }

    @Test
    @Transactional
    public void getEmployeeSalary() throws Exception {
        // Initialize the database
        employeeSalaryRepository.saveAndFlush(employeeSalary);

        // Get the employeeSalary
        restEmployeeSalaryMockMvc.perform(get("/api/employee-salaries/{id}", employeeSalary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeSalary.getId().intValue()))
            .andExpect(jsonPath("$.gross").value(DEFAULT_GROSS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeSalary() throws Exception {
        // Get the employeeSalary
        restEmployeeSalaryMockMvc.perform(get("/api/employee-salaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeSalary() throws Exception {
        // Initialize the database
        employeeSalaryRepository.saveAndFlush(employeeSalary);
        int databaseSizeBeforeUpdate = employeeSalaryRepository.findAll().size();

        // Update the employeeSalary
        EmployeeSalary updatedEmployeeSalary = employeeSalaryRepository.findOne(employeeSalary.getId());
        // Disconnect from session so that the updates on updatedEmployeeSalary are not directly saved in db
        em.detach(updatedEmployeeSalary);
        updatedEmployeeSalary
            .gross(UPDATED_GROSS);
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryMapper.toDto(updatedEmployeeSalary);

        restEmployeeSalaryMockMvc.perform(put("/api/employee-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalaryDTO)))
            .andExpect(status().isOk());

        // Validate the EmployeeSalary in the database
        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSalary testEmployeeSalary = employeeSalaryList.get(employeeSalaryList.size() - 1);
        assertThat(testEmployeeSalary.getGross()).isEqualTo(UPDATED_GROSS);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeSalary() throws Exception {
        int databaseSizeBeforeUpdate = employeeSalaryRepository.findAll().size();

        // Create the EmployeeSalary
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryMapper.toDto(employeeSalary);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployeeSalaryMockMvc.perform(put("/api/employee-salaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalaryDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeSalary in the database
        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployeeSalary() throws Exception {
        // Initialize the database
        employeeSalaryRepository.saveAndFlush(employeeSalary);
        int databaseSizeBeforeDelete = employeeSalaryRepository.findAll().size();

        // Get the employeeSalary
        restEmployeeSalaryMockMvc.perform(delete("/api/employee-salaries/{id}", employeeSalary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmployeeSalary> employeeSalaryList = employeeSalaryRepository.findAll();
        assertThat(employeeSalaryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSalary.class);
        EmployeeSalary employeeSalary1 = new EmployeeSalary();
        employeeSalary1.setId(1L);
        EmployeeSalary employeeSalary2 = new EmployeeSalary();
        employeeSalary2.setId(employeeSalary1.getId());
        assertThat(employeeSalary1).isEqualTo(employeeSalary2);
        employeeSalary2.setId(2L);
        assertThat(employeeSalary1).isNotEqualTo(employeeSalary2);
        employeeSalary1.setId(null);
        assertThat(employeeSalary1).isNotEqualTo(employeeSalary2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSalaryDTO.class);
        EmployeeSalaryDTO employeeSalaryDTO1 = new EmployeeSalaryDTO();
        employeeSalaryDTO1.setId(1L);
        EmployeeSalaryDTO employeeSalaryDTO2 = new EmployeeSalaryDTO();
        assertThat(employeeSalaryDTO1).isNotEqualTo(employeeSalaryDTO2);
        employeeSalaryDTO2.setId(employeeSalaryDTO1.getId());
        assertThat(employeeSalaryDTO1).isEqualTo(employeeSalaryDTO2);
        employeeSalaryDTO2.setId(2L);
        assertThat(employeeSalaryDTO1).isNotEqualTo(employeeSalaryDTO2);
        employeeSalaryDTO1.setId(null);
        assertThat(employeeSalaryDTO1).isNotEqualTo(employeeSalaryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(employeeSalaryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(employeeSalaryMapper.fromId(null)).isNull();
    }
}
