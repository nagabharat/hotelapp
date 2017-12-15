package com.synycs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.synycs.domain.enumeration.BillType;

/**
 * A Bills.
 */
@Entity
@Table(name = "bills")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bills implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bill_amount", nullable = false)
    private Double billAmount;

    @NotNull
    @Column(name = "billdate", nullable = false)
    private LocalDate billdate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "bill_type", nullable = false)
    private BillType billType;

    @NotNull
    @Lob
    @Column(name = "bill_image", nullable = false)
    private byte[] billImage;

    @Column(name = "bill_image_content_type", nullable = false)
    private String billImageContentType;

    @ManyToOne
    private Employee filedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getBillAmount() {
        return billAmount;
    }

    public Bills billAmount(Double billAmount) {
        this.billAmount = billAmount;
        return this;
    }

    public void setBillAmount(Double billAmount) {
        this.billAmount = billAmount;
    }

    public LocalDate getBilldate() {
        return billdate;
    }

    public Bills billdate(LocalDate billdate) {
        this.billdate = billdate;
        return this;
    }

    public void setBilldate(LocalDate billdate) {
        this.billdate = billdate;
    }

    public BillType getBillType() {
        return billType;
    }

    public Bills billType(BillType billType) {
        this.billType = billType;
        return this;
    }

    public void setBillType(BillType billType) {
        this.billType = billType;
    }

    public byte[] getBillImage() {
        return billImage;
    }

    public Bills billImage(byte[] billImage) {
        this.billImage = billImage;
        return this;
    }

    public void setBillImage(byte[] billImage) {
        this.billImage = billImage;
    }

    public String getBillImageContentType() {
        return billImageContentType;
    }

    public Bills billImageContentType(String billImageContentType) {
        this.billImageContentType = billImageContentType;
        return this;
    }

    public void setBillImageContentType(String billImageContentType) {
        this.billImageContentType = billImageContentType;
    }

    public Employee getFiledBy() {
        return filedBy;
    }

    public Bills filedBy(Employee employee) {
        this.filedBy = employee;
        return this;
    }

    public void setFiledBy(Employee employee) {
        this.filedBy = employee;
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
        Bills bills = (Bills) o;
        if (bills.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bills.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bills{" +
            "id=" + getId() +
            ", billAmount=" + getBillAmount() +
            ", billdate='" + getBilldate() + "'" +
            ", billType='" + getBillType() + "'" +
            ", billImage='" + getBillImage() + "'" +
            ", billImageContentType='" + getBillImageContentType() + "'" +
            "}";
    }
}
