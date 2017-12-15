package com.synycs.domain.enumeration;

/**
 * The RoomType enumeration.
 */
public enum RoomType {
    AC{
        public  double price(long numOfDays,long numberOfPeople){
            return  900*numOfDays;
        }
    }, NON_AC{
        public  double price(long numOfDays,long numberOfPeople){
            return numberOfPeople==1?350*numOfDays:40*numOfDays;
        }
    };


    public abstract double price(long numOfDays,long numberOfPeople);
}
