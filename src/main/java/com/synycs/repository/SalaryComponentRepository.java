package com.synycs.repository;

import com.synycs.domain.SalaryComponent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SalaryComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalaryComponentRepository extends JpaRepository<SalaryComponent, Long> {

}
