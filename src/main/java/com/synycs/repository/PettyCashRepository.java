package com.synycs.repository;

import com.synycs.domain.PettyCash;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PettyCash entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PettyCashRepository extends JpaRepository<PettyCash, Long> {

}
