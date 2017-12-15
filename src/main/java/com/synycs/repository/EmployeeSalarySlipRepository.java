package com.synycs.repository;

import com.synycs.domain.EmployeeSalarySlip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmployeeSalarySlip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeSalarySlipRepository extends JpaRepository<EmployeeSalarySlip, Long> {

}
