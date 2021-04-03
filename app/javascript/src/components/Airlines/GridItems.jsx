import React from 'react';
import AirlineCard from "./AirlineCard";

const GridItems = ({airlines}) => {
    return airlines.map((airline) => {
        return (
            <
            AirlineCard
            airline={airline}
            />
        );
    });
};

export default GridItems;
