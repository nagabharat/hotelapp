package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.EmployeeSalarySlip;
import com.synycs.repository.EmployeeSalarySlipRepository;
import com.synycs.service.EmployeeSalarySlipService;
import com.synycs.service.dto.EmployeeSalarySlipDTO;
import com.synycs.service.mapper.EmployeeSalarySlipMapper;
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
 * Test class for the EmployeeSalarySlipResource REST controller.
 *
 * @see EmployeeSalarySlipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class EmployeeSalarySlipResourceIntTest {

    private static final Double DEFAULT_GROSS = 1D;
    private static final Double UPDATED_GROSS = 2D;

    @Autowired
    private EmployeeSalarySlipRepository employeeSalarySlipRepository;

    @Autowired
    private EmployeeSalarySlipMapper employeeSalarySlipMapper;

    @Autowired
    private EmployeeSalarySlipService employeeSalarySlipService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmployeeSalarySlipMockMvc;

    private EmployeeSalarySlip employeeSalarySlip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeSalarySlipResource employeeSalarySlipResource = new EmployeeSalarySlipResource(employeeSalarySlipService);
        this.restEmployeeSalarySlipMockMvc = MockMvcBuilders.standaloneSetup(employeeSalarySlipResource)
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
    public static EmployeeSalarySlip createEntity(EntityManager em) {
        EmployeeSalarySlip employeeSalarySlip = new EmployeeSalarySlip()
            .gross(DEFAULT_GROSS);
        return employeeSalarySlip;
    }

    @Before
    public void initTest() {
        employeeSalarySlip = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeSalarySlip() throws Exception {
        int databaseSizeBeforeCreate = employeeSalarySlipRepository.findAll().size();

        // Create the EmployeeSalarySlip
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipMapper.toDto(employeeSalarySlip);
        restEmployeeSalarySlipMockMvc.perform(post("/api/employee-salary-slips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalarySlipDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeSalarySlip in the database
        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeSalarySlip testEmployeeSalarySlip = employeeSalarySlipList.get(employeeSalarySlipList.size() - 1);
        assertThat(testEmployeeSalarySlip.getGross()).isEqualTo(DEFAULT_GROSS);
    }

    @Test
    @Transactional
    public void createEmployeeSalarySlipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeSalarySlipRepository.findAll().size();

        // Create the EmployeeSalarySlip with an existing ID
        employeeSalarySlip.setId(1L);
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipMapper.toDto(employeeSalarySlip);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeSalarySlipMockMvc.perform(post("/api/employee-salary-slips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalarySlipDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeSalarySlip in the database
        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGrossIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeSalarySlipRepository.findAll().size();
        // set the field null
        employeeSalarySlip.setGross(null);

        // Create the EmployeeSalarySlip, which fails.
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipMapper.toDto(employeeSalarySlip);

        restEmployeeSalarySlipMockMvc.perform(post("/api/employee-salary-slips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalarySlipDTO)))
            .andExpect(status().isBadRequest());

        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployeeSalarySlips() throws Exception {
        // Initialize the database
        employeeSalarySlipRepository.saveAndFlush(employeeSalarySlip);

        // Get all the employeeSalarySlipList
        restEmployeeSalarySlipMockMvc.perform(get("/api/employee-salary-slips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeSalarySlip.getId().intValue())))
            .andExpect(jsonPath("$.[*].gross").value(hasItem(DEFAULT_GROSS.doubleValue())));
    }

    @Test
    @Transactional
    public void getEmployeeSalarySlip() throws Exception {
        // Initialize the database
        employeeSalarySlipRepository.saveAndFlush(employeeSalarySlip);

        // Get the employeeSalarySlip
        restEmployeeSalarySlipMockMvc.perform(get("/api/employee-salary-slips/{id}", employeeSalarySlip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeSalarySlip.getId().intValue()))
            .andExpect(jsonPath("$.gross").value(DEFAULT_GROSS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeSalarySlip() throws Exception {
        // Get the employeeSalarySlip
        restEmployeeSalarySlipMockMvc.perform(get("/api/employee-salary-slips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeSalarySlip() throws Exception {
        // Initialize the database
        employeeSalarySlipRepository.saveAndFlush(employeeSalarySlip);
        int databaseSizeBeforeUpdate = employeeSalarySlipRepository.findAll().size();

        // Update the employeeSalarySlip
        EmployeeSalarySlip updatedEmployeeSalarySlip = employeeSalarySlipRepository.findOne(employeeSalarySlip.getId());
        // Disconnect from session so that the updates on updatedEmployeeSalarySlip are not directly saved in db
        em.detach(updatedEmployeeSalarySlip);
        updatedEmployeeSalarySlip
            .gross(UPDATED_GROSS);
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipMapper.toDto(updatedEmployeeSalarySlip);

        restEmployeeSalarySlipMockMvc.perform(put("/api/employee-salary-slips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalarySlipDTO)))
            .andExpect(status().isOk());

        // Validate the EmployeeSalarySlip in the database
        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeUpdate);
        EmployeeSalarySlip testEmployeeSalarySlip = employeeSalarySlipList.get(employeeSalarySlipList.size() - 1);
        assertThat(testEmployeeSalarySlip.getGross()).isEqualTo(UPDATED_GROSS);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeSalarySlip() throws Exception {
        int databaseSizeBeforeUpdate = employeeSalarySlipRepository.findAll().size();

        // Create the EmployeeSalarySlip
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipMapper.toDto(employeeSalarySlip);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmployeeSalarySlipMockMvc.perform(put("/api/employee-salary-slips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeSalarySlipDTO)))
            .andExpect(status().isCreated());

        // Validate the EmployeeSalarySlip in the database
        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmployeeSalarySlip() throws Exception {
        // Initialize the database
        employeeSalarySlipRepository.saveAndFlush(employeeSalarySlip);
        int databaseSizeBeforeDelete = employeeSalarySlipRepository.findAll().size();

        // Get the employeeSalarySlip
        restEmployeeSalarySlipMockMvc.perform(delete("/api/employee-salary-slips/{id}", employeeSalarySlip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmployeeSalarySlip> employeeSalarySlipList = employeeSalarySlipRepository.findAll();
        assertThat(employeeSalarySlipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSalarySlip.class);
        EmployeeSalarySlip employeeSalarySlip1 = new EmployeeSalarySlip();
        employeeSalarySlip1.setId(1L);
        EmployeeSalarySlip employeeSalarySlip2 = new EmployeeSalarySlip();
        employeeSalarySlip2.setId(employeeSalarySlip1.getId());
        assertThat(employeeSalarySlip1).isEqualTo(employeeSalarySlip2);
        employeeSalarySlip2.setId(2L);
        assertThat(employeeSalarySlip1).isNotEqualTo(employeeSalarySlip2);
        employeeSalarySlip1.setId(null);
        assertThat(employeeSalarySlip1).isNotEqualTo(employeeSalarySlip2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeSalarySlipDTO.class);
        EmployeeSalarySlipDTO employeeSalarySlipDTO1 = new EmployeeSalarySlipDTO();
        employeeSalarySlipDTO1.setId(1L);
        EmployeeSalarySlipDTO employeeSalarySlipDTO2 = new EmployeeSalarySlipDTO();
        assertThat(employeeSalarySlipDTO1).isNotEqualTo(employeeSalarySlipDTO2);
        employeeSalarySlipDTO2.setId(employeeSalarySlipDTO1.getId());
        assertThat(employeeSalarySlipDTO1).isEqualTo(employeeSalarySlipDTO2);
        employeeSalarySlipDTO2.setId(2L);
        assertThat(employeeSalarySlipDTO1).isNotEqualTo(employeeSalarySlipDTO2);
        employeeSalarySlipDTO1.setId(null);
        assertThat(employeeSalarySlipDTO1).isNotEqualTo(employeeSalarySlipDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(employeeSalarySlipMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(employeeSalarySlipMapper.fromId(null)).isNull();
    }
}
