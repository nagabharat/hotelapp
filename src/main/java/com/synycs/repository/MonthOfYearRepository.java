package com.synycs.repository;

import com.synycs.domain.MonthOfYear;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MonthOfYear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonthOfYearRepository extends JpaRepository<MonthOfYear, Long> {

}
