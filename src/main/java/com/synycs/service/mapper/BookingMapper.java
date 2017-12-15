package com.synycs.service.mapper;

import com.synycs.domain.*;
import com.synycs.service.dto.BookingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Booking and its DTO BookingDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface BookingMapper extends EntityMapper<BookingDTO, Booking> {

    @Mapping(source = "customers.id", target = "customersId")
    BookingDTO toDto(Booking booking); 

    @Mapping(target = "bookedRooms", ignore = true)
    @Mapping(source = "customersId", target = "customers")
    Booking toEntity(BookingDTO bookingDTO);

    default Booking fromId(Long id) {
        if (id == null) {
            return null;
        }
        Booking booking = new Booking();
        booking.setId(id);
        return booking;
    }
}
