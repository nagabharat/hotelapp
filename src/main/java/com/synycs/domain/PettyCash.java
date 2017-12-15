package com.synycs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.synycs.domain.enumeration.PettyCashSetting;

/**
 * A PettyCash.
 */
@Entity
@Table(name = "petty_cash")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PettyCash implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "petty_cash_settings", nullable = false)
    private PettyCashSetting pettyCashSettings;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @NotNull
    @Column(name = "billdate", nullable = false)
    private LocalDate billdate;

    @ManyToOne
    private Employee filedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PettyCashSetting getPettyCashSettings() {
        return pettyCashSettings;
    }

    public PettyCash pettyCashSettings(PettyCashSetting pettyCashSettings) {
        this.pettyCashSettings = pettyCashSettings;
        return this;
    }

    public void setPettyCashSettings(PettyCashSetting pettyCashSettings) {
        this.pettyCashSettings = pettyCashSettings;
    }

    public Double getAmount() {
        return amount;
    }

    public PettyCash amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getBilldate() {
        return billdate;
    }

    public PettyCash billdate(LocalDate billdate) {
        this.billdate = billdate;
        return this;
    }

    public void setBilldate(LocalDate billdate) {
        this.billdate = billdate;
    }

    public Employee getFiledBy() {
        return filedBy;
    }

    public PettyCash filedBy(Employee employee) {
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
        PettyCash pettyCash = (PettyCash) o;
        if (pettyCash.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pettyCash.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PettyCash{" +
            "id=" + getId() +
            ", pettyCashSettings='" + getPettyCashSettings() + "'" +
            ", amount=" + getAmount() +
            ", billdate='" + getBilldate() + "'" +
            "}";
    }
}
