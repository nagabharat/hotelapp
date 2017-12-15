package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.SalaryComponentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SalaryComponent and its DTO SalaryComponentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SalaryComponentMapper extends EntityMapper<SalaryComponentDTO, SalaryComponent> {

    

    

    default SalaryComponent fromId(Long id) {
        if (id == null) {
            return null;
        }
        SalaryComponent salaryComponent = new SalaryComponent();
        salaryComponent.setId(id);
        return salaryComponent;
    }
}
