package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.EmployeeSalaryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EmployeeSalary and its DTO EmployeeSalaryDTO.
 */
@Mapper(componentModel = "spring", uses = {MonthOfYearMapper.class, EmployeeMapper.class})
public interface EmployeeSalaryMapper extends EntityMapper<EmployeeSalaryDTO, EmployeeSalary> {

    @Mapping(source = "changedMonth.id", target = "changedMonthId")
    @Mapping(source = "employee.id", target = "employeeId")
    EmployeeSalaryDTO toDto(EmployeeSalary employeeSalary); 

    @Mapping(source = "changedMonthId", target = "changedMonth")
    @Mapping(source = "employeeId", target = "employee")
    EmployeeSalary toEntity(EmployeeSalaryDTO employeeSalaryDTO);

    default EmployeeSalary fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.setId(id);
        return employeeSalary;
    }
}
