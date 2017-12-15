package com.synycs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SalaryComponent.
 */
@Entity
@Table(name = "salary_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SalaryComponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "gross_percent", nullable = false)
    private Double grossPercent;

    @NotNull
    @Column(name = "date_of_joining", nullable = false)
    private LocalDate dateOfJoining;

    @NotNull
    @Column(name = "deduction", nullable = false)
    private Boolean deduction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SalaryComponent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getGrossPercent() {
        return grossPercent;
    }

    public SalaryComponent grossPercent(Double grossPercent) {
        this.grossPercent = grossPercent;
        return this;
    }

    public void setGrossPercent(Double grossPercent) {
        this.grossPercent = grossPercent;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public SalaryComponent dateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
        return this;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public Boolean isDeduction() {
        return deduction;
    }

    public SalaryComponent deduction(Boolean deduction) {
        this.deduction = deduction;
        return this;
    }

    public void setDeduction(Boolean deduction) {
        this.deduction = deduction;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SalaryComponent salaryComponent = (SalaryComponent) o;
        if (salaryComponent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salaryComponent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalaryComponent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", grossPercent=" + getGrossPercent() +
            ", dateOfJoining='" + getDateOfJoining() + "'" +
            ", deduction='" + isDeduction() + "'" +
            "}";
    }
}
