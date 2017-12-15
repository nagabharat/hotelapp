package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.EmployeeSalarySlipDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EmployeeSalarySlip and its DTO EmployeeSalarySlipDTO.
 */
@Mapper(componentModel = "spring", uses = {MonthOfYearMapper.class, EmployeeMapper.class})
public interface EmployeeSalarySlipMapper extends EntityMapper<EmployeeSalarySlipDTO, EmployeeSalarySlip> {

    @Mapping(source = "month.id", target = "monthId")
    @Mapping(source = "employee.id", target = "employeeId")
    EmployeeSalarySlipDTO toDto(EmployeeSalarySlip employeeSalarySlip); 

    @Mapping(source = "monthId", target = "month")
    @Mapping(source = "employeeId", target = "employee")
    EmployeeSalarySlip toEntity(EmployeeSalarySlipDTO employeeSalarySlipDTO);

    default EmployeeSalarySlip fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmployeeSalarySlip employeeSalarySlip = new EmployeeSalarySlip();
        employeeSalarySlip.setId(id);
        return employeeSalarySlip;
    }
}
