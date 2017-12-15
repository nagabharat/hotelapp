package com.synycs.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.synycs.domain.enumeration.PettyCashSetting;

/**
 * A DTO for the PettyCash entity.
 */
public class PettyCashDTO implements Serializable {

    private Long id;

    @NotNull
    private PettyCashSetting pettyCashSettings;

    @NotNull
    private Double amount;

    @NotNull
    private LocalDate billdate;

    private Long filedById;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PettyCashSetting getPettyCashSettings() {
        return pettyCashSettings;
    }

    public void setPettyCashSettings(PettyCashSetting pettyCashSettings) {
        this.pettyCashSettings = pettyCashSettings;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getBilldate() {
        return billdate;
    }

    public void setBilldate(LocalDate billdate) {
        this.billdate = billdate;
    }

    public Long getFiledById() {
        return filedById;
    }

    public void setFiledById(Long employeeId) {
        this.filedById = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PettyCashDTO pettyCashDTO = (PettyCashDTO) o;
        if(pettyCashDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pettyCashDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PettyCashDTO{" +
            "id=" + getId() +
            ", pettyCashSettings='" + getPettyCashSettings() + "'" +
            ", amount=" + getAmount() +
            ", billdate='" + getBilldate() + "'" +
            "}";
    }
}
