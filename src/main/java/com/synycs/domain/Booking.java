package com.synycs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.Objects;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "number_of_people")
    private Long numberOfPeople;

    @OneToMany(mappedBy = "booking")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> bookedRooms = new HashSet<>();

    @ManyToOne
    private Customer customers;

    private double amountPaid;

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public double remainingAmount(){

       return this.getPrice(Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toDays(),
           this.numberOfPeople)
            -this.amountPaid;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Booking date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Booking startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Booking endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getNumberOfPeople() {
        return numberOfPeople;
    }

    public Booking numberOfPeople(Long numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Long numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public Set<Room> getBookedRooms() {
        return bookedRooms;
    }

    public Booking bookedRooms(Set<Room> rooms) {
        this.bookedRooms = rooms;
        return this;
    }

    public Booking addBookedRooms(Room room) {
        this.bookedRooms.add(room);
        room.setBooking(this);
        return this;
    }

    public Booking removeBookedRooms(Room room) {
        this.bookedRooms.remove(room);
        room.setBooking(null);
        return this;
    }

    public void setBookedRooms(Set<Room> rooms) {
        this.bookedRooms = rooms;
    }

    public Customer getCustomers() {
        return customers;
    }

    public Booking customers(Customer customer) {
        this.customers = customer;
        return this;
    }

    public void completeCheckout(double amount){
        this.amountPaid+=amount;

    }

    public void setCustomers(Customer customer) {
        this.customers = customer;
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
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    public double getPrice(long numberOfdays,long numberOfPeople){
        return this.bookedRooms.stream().mapToDouble(x->x.getRoomType().
            price(numberOfdays,numberOfPeople)).
            reduce(0,(a,b)->a+b);
    }


    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", numberOfPeople=" + getNumberOfPeople() +
            "}";
    }
}
