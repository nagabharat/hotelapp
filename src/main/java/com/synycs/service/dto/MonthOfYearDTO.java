package com.synycs.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MonthOfYear entity.
 */
public class MonthOfYearDTO implements Serializable {

    private Long id;

    @NotNull
    private Long year;

    @NotNull
    private Long month;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Long getMonth() {
        return month;
    }

    public void setMonth(Long month) {
        this.month = month;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MonthOfYearDTO monthOfYearDTO = (MonthOfYearDTO) o;
        if(monthOfYearDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), monthOfYearDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MonthOfYearDTO{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", month=" + getMonth() +
            "}";
    }
}
