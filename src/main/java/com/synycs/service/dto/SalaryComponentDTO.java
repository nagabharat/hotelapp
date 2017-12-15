package com.synycs.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SalaryComponent entity.
 */
public class SalaryComponentDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Double grossPercent;

    @NotNull
    private LocalDate dateOfJoining;

    @NotNull
    private Boolean deduction;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getGrossPercent() {
        return grossPercent;
    }

    public void setGrossPercent(Double grossPercent) {
        this.grossPercent = grossPercent;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public Boolean isDeduction() {
        return deduction;
    }

    public void setDeduction(Boolean deduction) {
        this.deduction = deduction;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SalaryComponentDTO salaryComponentDTO = (SalaryComponentDTO) o;
        if(salaryComponentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salaryComponentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalaryComponentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", grossPercent=" + getGrossPercent() +
            ", dateOfJoining='" + getDateOfJoining() + "'" +
            ", deduction='" + isDeduction() + "'" +
            "}";
    }
}
