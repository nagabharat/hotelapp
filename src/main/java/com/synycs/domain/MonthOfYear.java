package com.synycs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MonthOfYear.
 */
@Entity
@Table(name = "month_of_year")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MonthOfYear implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Long year;

    @NotNull
    @Column(name = "month", nullable = false)
    private Long month;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getYear() {
        return year;
    }

    public MonthOfYear year(Long year) {
        this.year = year;
        return this;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Long getMonth() {
        return month;
    }

    public MonthOfYear month(Long month) {
        this.month = month;
        return this;
    }

    public void setMonth(Long month) {
        this.month = month;
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
        MonthOfYear monthOfYear = (MonthOfYear) o;
        if (monthOfYear.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), monthOfYear.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MonthOfYear{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", month=" + getMonth() +
            "}";
    }
}
