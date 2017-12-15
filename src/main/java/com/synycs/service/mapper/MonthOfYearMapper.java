package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.MonthOfYearDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MonthOfYear and its DTO MonthOfYearDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MonthOfYearMapper extends EntityMapper<MonthOfYearDTO, MonthOfYear> {

    

    

    default MonthOfYear fromId(Long id) {
        if (id == null) {
            return null;
        }
        MonthOfYear monthOfYear = new MonthOfYear();
        monthOfYear.setId(id);
        return monthOfYear;
    }
}
