package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.PettyCashDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PettyCash and its DTO PettyCashDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface PettyCashMapper extends EntityMapper<PettyCashDTO, PettyCash> {

    @Mapping(source = "filedBy.id", target = "filedById")
    PettyCashDTO toDto(PettyCash pettyCash); 

    @Mapping(source = "filedById", target = "filedBy")
    PettyCash toEntity(PettyCashDTO pettyCashDTO);

    default PettyCash fromId(Long id) {
        if (id == null) {
            return null;
        }
        PettyCash pettyCash = new PettyCash();
        pettyCash.setId(id);
        return pettyCash;
    }
}
