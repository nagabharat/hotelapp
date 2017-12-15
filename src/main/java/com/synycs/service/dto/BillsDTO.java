package com.synycs.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.synycs.domain.enumeration.BillType;

/**
 * A DTO for the Bills entity.
 */
public class BillsDTO implements Serializable {

    private Long id;

    @NotNull
    private Double billAmount;

    @NotNull
    private LocalDate billdate;

    @NotNull
    private BillType billType;

    @NotNull
    @Lob
    private byte[] billImage;
    private String billImageContentType;

    private Long filedById;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(Double billAmount) {
        this.billAmount = billAmount;
    }

    public LocalDate getBilldate() {
        return billdate;
    }

    public void setBilldate(LocalDate billdate) {
        this.billdate = billdate;
    }

    public BillType getBillType() {
        return billType;
    }

    public void setBillType(BillType billType) {
        this.billType = billType;
    }

    public byte[] getBillImage() {
        return billImage;
    }

    public void setBillImage(byte[] billImage) {
        this.billImage = billImage;
    }

    public String getBillImageContentType() {
        return billImageContentType;
    }

    public void setBillImageContentType(String billImageContentType) {
        this.billImageContentType = billImageContentType;
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

        BillsDTO billsDTO = (BillsDTO) o;
        if(billsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillsDTO{" +
            "id=" + getId() +
            ", billAmount=" + getBillAmount() +
            ", billdate='" + getBilldate() + "'" +
            ", billType='" + getBillType() + "'" +
            ", billImage='" + getBillImage() + "'" +
            "}";
    }
}
