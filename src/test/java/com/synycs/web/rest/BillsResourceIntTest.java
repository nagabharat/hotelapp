package com.synycs.web.rest;

import com.synycs.HotelApp;

import com.synycs.domain.Bills;
import com.synycs.repository.BillsRepository;
import com.synycs.service.BillsService;
import com.synycs.service.dto.BillsDTO;
import com.synycs.service.mapper.BillsMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.synycs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.synycs.domain.enumeration.BillType;
/**
 * Test class for the BillsResource REST controller.
 *
 * @see BillsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HotelApp.class)
public class BillsResourceIntTest {

    private static final Double DEFAULT_BILL_AMOUNT = 1D;
    private static final Double UPDATED_BILL_AMOUNT = 2D;

    private static final LocalDate DEFAULT_BILLDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BILLDATE = LocalDate.now(ZoneId.systemDefault());

    private static final BillType DEFAULT_BILL_TYPE = BillType.WATER;
    private static final BillType UPDATED_BILL_TYPE = BillType.ELECTRICITY;

    private static final byte[] DEFAULT_BILL_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BILL_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_BILL_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BILL_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private BillsRepository billsRepository;

    @Autowired
    private BillsMapper billsMapper;

    @Autowired
    private BillsService billsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBillsMockMvc;

    private Bills bills;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BillsResource billsResource = new BillsResource(billsService);
        this.restBillsMockMvc = MockMvcBuilders.standaloneSetup(billsResource)
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
    public static Bills createEntity(EntityManager em) {
        Bills bills = new Bills()
            .billAmount(DEFAULT_BILL_AMOUNT)
            .billdate(DEFAULT_BILLDATE)
            .billType(DEFAULT_BILL_TYPE)
            .billImage(DEFAULT_BILL_IMAGE)
            .billImageContentType(DEFAULT_BILL_IMAGE_CONTENT_TYPE);
        return bills;
    }

    @Before
    public void initTest() {
        bills = createEntity(em);
    }

    @Test
    @Transactional
    public void createBills() throws Exception {
        int databaseSizeBeforeCreate = billsRepository.findAll().size();

        // Create the Bills
        BillsDTO billsDTO = billsMapper.toDto(bills);
        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isCreated());

        // Validate the Bills in the database
        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeCreate + 1);
        Bills testBills = billsList.get(billsList.size() - 1);
        assertThat(testBills.getBillAmount()).isEqualTo(DEFAULT_BILL_AMOUNT);
        assertThat(testBills.getBilldate()).isEqualTo(DEFAULT_BILLDATE);
        assertThat(testBills.getBillType()).isEqualTo(DEFAULT_BILL_TYPE);
        assertThat(testBills.getBillImage()).isEqualTo(DEFAULT_BILL_IMAGE);
        assertThat(testBills.getBillImageContentType()).isEqualTo(DEFAULT_BILL_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createBillsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billsRepository.findAll().size();

        // Create the Bills with an existing ID
        bills.setId(1L);
        BillsDTO billsDTO = billsMapper.toDto(bills);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bills in the database
        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBillAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = billsRepository.findAll().size();
        // set the field null
        bills.setBillAmount(null);

        // Create the Bills, which fails.
        BillsDTO billsDTO = billsMapper.toDto(bills);

        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isBadRequest());

        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBilldateIsRequired() throws Exception {
        int databaseSizeBeforeTest = billsRepository.findAll().size();
        // set the field null
        bills.setBilldate(null);

        // Create the Bills, which fails.
        BillsDTO billsDTO = billsMapper.toDto(bills);

        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isBadRequest());

        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = billsRepository.findAll().size();
        // set the field null
        bills.setBillType(null);

        // Create the Bills, which fails.
        BillsDTO billsDTO = billsMapper.toDto(bills);

        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isBadRequest());

        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = billsRepository.findAll().size();
        // set the field null
        bills.setBillImage(null);

        // Create the Bills, which fails.
        BillsDTO billsDTO = billsMapper.toDto(bills);

        restBillsMockMvc.perform(post("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isBadRequest());

        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBills() throws Exception {
        // Initialize the database
        billsRepository.saveAndFlush(bills);

        // Get all the billsList
        restBillsMockMvc.perform(get("/api/bills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bills.getId().intValue())))
            .andExpect(jsonPath("$.[*].billAmount").value(hasItem(DEFAULT_BILL_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].billdate").value(hasItem(DEFAULT_BILLDATE.toString())))
            .andExpect(jsonPath("$.[*].billType").value(hasItem(DEFAULT_BILL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].billImageContentType").value(hasItem(DEFAULT_BILL_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].billImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_BILL_IMAGE))));
    }

    @Test
    @Transactional
    public void getBills() throws Exception {
        // Initialize the database
        billsRepository.saveAndFlush(bills);

        // Get the bills
        restBillsMockMvc.perform(get("/api/bills/{id}", bills.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bills.getId().intValue()))
            .andExpect(jsonPath("$.billAmount").value(DEFAULT_BILL_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.billdate").value(DEFAULT_BILLDATE.toString()))
            .andExpect(jsonPath("$.billType").value(DEFAULT_BILL_TYPE.toString()))
            .andExpect(jsonPath("$.billImageContentType").value(DEFAULT_BILL_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.billImage").value(Base64Utils.encodeToString(DEFAULT_BILL_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingBills() throws Exception {
        // Get the bills
        restBillsMockMvc.perform(get("/api/bills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBills() throws Exception {
        // Initialize the database
        billsRepository.saveAndFlush(bills);
        int databaseSizeBeforeUpdate = billsRepository.findAll().size();

        // Update the bills
        Bills updatedBills = billsRepository.findOne(bills.getId());
        // Disconnect from session so that the updates on updatedBills are not directly saved in db
        em.detach(updatedBills);
        updatedBills
            .billAmount(UPDATED_BILL_AMOUNT)
            .billdate(UPDATED_BILLDATE)
            .billType(UPDATED_BILL_TYPE)
            .billImage(UPDATED_BILL_IMAGE)
            .billImageContentType(UPDATED_BILL_IMAGE_CONTENT_TYPE);
        BillsDTO billsDTO = billsMapper.toDto(updatedBills);

        restBillsMockMvc.perform(put("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isOk());

        // Validate the Bills in the database
        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeUpdate);
        Bills testBills = billsList.get(billsList.size() - 1);
        assertThat(testBills.getBillAmount()).isEqualTo(UPDATED_BILL_AMOUNT);
        assertThat(testBills.getBilldate()).isEqualTo(UPDATED_BILLDATE);
        assertThat(testBills.getBillType()).isEqualTo(UPDATED_BILL_TYPE);
        assertThat(testBills.getBillImage()).isEqualTo(UPDATED_BILL_IMAGE);
        assertThat(testBills.getBillImageContentType()).isEqualTo(UPDATED_BILL_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingBills() throws Exception {
        int databaseSizeBeforeUpdate = billsRepository.findAll().size();

        // Create the Bills
        BillsDTO billsDTO = billsMapper.toDto(bills);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBillsMockMvc.perform(put("/api/bills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(billsDTO)))
            .andExpect(status().isCreated());

        // Validate the Bills in the database
        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBills() throws Exception {
        // Initialize the database
        billsRepository.saveAndFlush(bills);
        int databaseSizeBeforeDelete = billsRepository.findAll().size();

        // Get the bills
        restBillsMockMvc.perform(delete("/api/bills/{id}", bills.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bills> billsList = billsRepository.findAll();
        assertThat(billsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bills.class);
        Bills bills1 = new Bills();
        bills1.setId(1L);
        Bills bills2 = new Bills();
        bills2.setId(bills1.getId());
        assertThat(bills1).isEqualTo(bills2);
        bills2.setId(2L);
        assertThat(bills1).isNotEqualTo(bills2);
        bills1.setId(null);
        assertThat(bills1).isNotEqualTo(bills2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BillsDTO.class);
        BillsDTO billsDTO1 = new BillsDTO();
        billsDTO1.setId(1L);
        BillsDTO billsDTO2 = new BillsDTO();
        assertThat(billsDTO1).isNotEqualTo(billsDTO2);
        billsDTO2.setId(billsDTO1.getId());
        assertThat(billsDTO1).isEqualTo(billsDTO2);
        billsDTO2.setId(2L);
        assertThat(billsDTO1).isNotEqualTo(billsDTO2);
        billsDTO1.setId(null);
        assertThat(billsDTO1).isNotEqualTo(billsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(billsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(billsMapper.fromId(null)).isNull();
    }
}
