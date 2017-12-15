package com.synycs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A EmployeeSalary.
 */
@Entity
@Table(name = "employee_salary")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmployeeSalary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "gross", nullable = false)
    private Double gross;

    @OneToOne
    @JoinColumn(unique = true)
    private MonthOfYear changedMonth;

    @ManyToOne
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getGross() {
        return gross;
    }

    public EmployeeSalary gross(Double gross) {
        this.gross = gross;
        return this;
    }

    public void setGross(Double gross) {
        this.gross = gross;
    }

    public MonthOfYear getChangedMonth() {
        return changedMonth;
    }

    public EmployeeSalary changedMonth(MonthOfYear monthOfYear) {
        this.changedMonth = monthOfYear;
        return this;
    }

    public void setChangedMonth(MonthOfYear monthOfYear) {
        this.changedMonth = monthOfYear;
    }

    public Employee getEmployee() {
        return employee;
    }

    public EmployeeSalary employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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
        EmployeeSalary employeeSalary = (EmployeeSalary) o;
        if (employeeSalary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeeSalary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeeSalary{" +
            "id=" + getId() +
            ", gross=" + getGross() +
            "}";
    }
}
