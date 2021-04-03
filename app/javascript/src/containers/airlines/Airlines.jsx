import React, { useState, useEffect } from 'react';
import AirlineService from "../../services/AirlineService";
import AppAdapter from "../../utils/adapter";
import GridItems from "../../components/Airlines/GridItems";
import styled from 'styled-components'

const Home = styled.div`
  text-align:center;
`;

const Header = styled.div`
  padding:100px 100px 10px 100px;
  
  h1 {
    font-size:42px;
  }
`;

const Subheader = styled.p`
  font-weight:300;
  font-size:26px;
`;


const Airlines = () => {
    const [ airlines, setAirlines ] = useState([]);

    useEffect(()=> {
        async function getAirlines() {
            const response = await AirlineService.fetchAllAirlines();
            if(response.ok) {
                const result = await AppAdapter.deserialize(response.result);
                setAirlines(result);
            }
            else {
                setAirlines([]);
            }
        }
        getAirlines();

    }, []);


    return (
        <Home className="home">
            <Header className="header">
                <Subheader>OpenFlights</Subheader>
                <p className="subheader">Honest, unbiased airline reviews. Share your experience.</p>
            </Header>
            <div className="grid">
                <ul>
                    <GridItems airlines={airlines} />
                </ul>
            </div>
        </Home>
    )
};

export default Airlines;
