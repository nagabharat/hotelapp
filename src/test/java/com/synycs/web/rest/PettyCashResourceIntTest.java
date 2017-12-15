package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.PettyCash;
import com.synycs.repository.PettyCashRepository;
import com.synycs.service.PettyCashService;
import com.synycs.service.dto.PettyCashDTO;
import com.synycs.service.mapper.PettyCashMapper;
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

import com.synycs.domain.enumeration.PettyCashSetting;
/**
 * Test class for the PettyCashResource REST controller.
 *
 * @see PettyCashResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class PettyCashResourceIntTest {

    private static final PettyCashSetting DEFAULT_PETTY_CASH_SETTINGS = PettyCashSetting.TEA;
    private static final PettyCashSetting UPDATED_PETTY_CASH_SETTINGS = PettyCashSetting.FUEL;

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final LocalDate DEFAULT_BILLDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BILLDATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PettyCashRepository pettyCashRepository;

    @Autowired
    private PettyCashMapper pettyCashMapper;

    @Autowired
    private PettyCashService pettyCashService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPettyCashMockMvc;

    private PettyCash pettyCash;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PettyCashResource pettyCashResource = new PettyCashResource(pettyCashService);
        this.restPettyCashMockMvc = MockMvcBuilders.standaloneSetup(pettyCashResource)
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
    public static PettyCash createEntity(EntityManager em) {
        PettyCash pettyCash = new PettyCash()
            .pettyCashSettings(DEFAULT_PETTY_CASH_SETTINGS)
            .amount(DEFAULT_AMOUNT)
            .billdate(DEFAULT_BILLDATE);
        return pettyCash;
    }

    @Before
    public void initTest() {
        pettyCash = createEntity(em);
    }

    @Test
    @Transactional
    public void createPettyCash() throws Exception {
        int databaseSizeBeforeCreate = pettyCashRepository.findAll().size();

        // Create the PettyCash
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);
        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isCreated());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeCreate + 1);
        PettyCash testPettyCash = pettyCashList.get(pettyCashList.size() - 1);
        assertThat(testPettyCash.getPettyCashSettings()).isEqualTo(DEFAULT_PETTY_CASH_SETTINGS);
        assertThat(testPettyCash.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testPettyCash.getBilldate()).isEqualTo(DEFAULT_BILLDATE);
    }

    @Test
    @Transactional
    public void createPettyCashWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pettyCashRepository.findAll().size();

        // Create the PettyCash with an existing ID
        pettyCash.setId(1L);
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPettyCashSettingsIsRequired() throws Exception {
        int databaseSizeBeforeTest = pettyCashRepository.findAll().size();
        // set the field null
        pettyCash.setPettyCashSettings(null);

        // Create the PettyCash, which fails.
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);

        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isBadRequest());

        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = pettyCashRepository.findAll().size();
        // set the field null
        pettyCash.setAmount(null);

        // Create the PettyCash, which fails.
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);

        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isBadRequest());

        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBilldateIsRequired() throws Exception {
        int databaseSizeBeforeTest = pettyCashRepository.findAll().size();
        // set the field null
        pettyCash.setBilldate(null);

        // Create the PettyCash, which fails.
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);

        restPettyCashMockMvc.perform(post("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isBadRequest());

        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPettyCashes() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);

        // Get all the pettyCashList
        restPettyCashMockMvc.perform(get("/api/petty-cashes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pettyCash.getId().intValue())))
            .andExpect(jsonPath("$.[*].pettyCashSettings").value(hasItem(DEFAULT_PETTY_CASH_SETTINGS.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].billdate").value(hasItem(DEFAULT_BILLDATE.toString())));
    }

    @Test
    @Transactional
    public void getPettyCash() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);

        // Get the pettyCash
        restPettyCashMockMvc.perform(get("/api/petty-cashes/{id}", pettyCash.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pettyCash.getId().intValue()))
            .andExpect(jsonPath("$.pettyCashSettings").value(DEFAULT_PETTY_CASH_SETTINGS.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.billdate").value(DEFAULT_BILLDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPettyCash() throws Exception {
        // Get the pettyCash
        restPettyCashMockMvc.perform(get("/api/petty-cashes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePettyCash() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);
        int databaseSizeBeforeUpdate = pettyCashRepository.findAll().size();

        // Update the pettyCash
        PettyCash updatedPettyCash = pettyCashRepository.findOne(pettyCash.getId());
        // Disconnect from session so that the updates on updatedPettyCash are not directly saved in db
        em.detach(updatedPettyCash);
        updatedPettyCash
            .pettyCashSettings(UPDATED_PETTY_CASH_SETTINGS)
            .amount(UPDATED_AMOUNT)
            .billdate(UPDATED_BILLDATE);
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(updatedPettyCash);

        restPettyCashMockMvc.perform(put("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isOk());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeUpdate);
        PettyCash testPettyCash = pettyCashList.get(pettyCashList.size() - 1);
        assertThat(testPettyCash.getPettyCashSettings()).isEqualTo(UPDATED_PETTY_CASH_SETTINGS);
        assertThat(testPettyCash.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testPettyCash.getBilldate()).isEqualTo(UPDATED_BILLDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPettyCash() throws Exception {
        int databaseSizeBeforeUpdate = pettyCashRepository.findAll().size();

        // Create the PettyCash
        PettyCashDTO pettyCashDTO = pettyCashMapper.toDto(pettyCash);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPettyCashMockMvc.perform(put("/api/petty-cashes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pettyCashDTO)))
            .andExpect(status().isCreated());

        // Validate the PettyCash in the database
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePettyCash() throws Exception {
        // Initialize the database
        pettyCashRepository.saveAndFlush(pettyCash);
        int databaseSizeBeforeDelete = pettyCashRepository.findAll().size();

        // Get the pettyCash
        restPettyCashMockMvc.perform(delete("/api/petty-cashes/{id}", pettyCash.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PettyCash> pettyCashList = pettyCashRepository.findAll();
        assertThat(pettyCashList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PettyCash.class);
        PettyCash pettyCash1 = new PettyCash();
        pettyCash1.setId(1L);
        PettyCash pettyCash2 = new PettyCash();
        pettyCash2.setId(pettyCash1.getId());
        assertThat(pettyCash1).isEqualTo(pettyCash2);
        pettyCash2.setId(2L);
        assertThat(pettyCash1).isNotEqualTo(pettyCash2);
        pettyCash1.setId(null);
        assertThat(pettyCash1).isNotEqualTo(pettyCash2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PettyCashDTO.class);
        PettyCashDTO pettyCashDTO1 = new PettyCashDTO();
        pettyCashDTO1.setId(1L);
        PettyCashDTO pettyCashDTO2 = new PettyCashDTO();
        assertThat(pettyCashDTO1).isNotEqualTo(pettyCashDTO2);
        pettyCashDTO2.setId(pettyCashDTO1.getId());
        assertThat(pettyCashDTO1).isEqualTo(pettyCashDTO2);
        pettyCashDTO2.setId(2L);
        assertThat(pettyCashDTO1).isNotEqualTo(pettyCashDTO2);
        pettyCashDTO1.setId(null);
        assertThat(pettyCashDTO1).isNotEqualTo(pettyCashDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pettyCashMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pettyCashMapper.fromId(null)).isNull();
    }
}
