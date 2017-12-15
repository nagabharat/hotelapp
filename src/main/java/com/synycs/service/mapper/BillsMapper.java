package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.BillsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bills and its DTO BillsDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface BillsMapper extends EntityMapper<BillsDTO, Bills> {

    @Mapping(source = "filedBy.id", target = "filedById")
    BillsDTO toDto(Bills bills); 

    @Mapping(source = "filedById", target = "filedBy")
    Bills toEntity(BillsDTO billsDTO);

    default Bills fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bills bills = new Bills();
        bills.setId(id);
        return bills;
    }
}
