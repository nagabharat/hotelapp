package com.synycs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the EmployeeSalary entity.
 */
public class EmployeeSalaryDTO implements Serializable {

    private Long id;

    @NotNull
    private Double gross;

    private Long changedMonthId;

    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getGross() {
        return gross;
    }

    public void setGross(Double gross) {
        this.gross = gross;
    }

    public Long getChangedMonthId() {
        return changedMonthId;
    }

    public void setChangedMonthId(Long monthOfYearId) {
        this.changedMonthId = monthOfYearId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EmployeeSalaryDTO employeeSalaryDTO = (EmployeeSalaryDTO) o;
        if(employeeSalaryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeeSalaryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeeSalaryDTO{" +
            "id=" + getId() +
            ", gross=" + getGross() +
            "}";
    }
}
