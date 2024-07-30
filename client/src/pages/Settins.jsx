import React from 'react'

import AddressForm from '../components/CheckoutAddressForm';
import SettingsForm from '../components/SettingsForm';

import styled from "styled-components";
import { mobile } from "../responsive";

const Halves = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Part = styled.div`
  border: 5px solid red;

`;

const Content = styled.div`
    
  padding: 25px 25vw;

`;



const Settings = () => {
  return (
    <Halves>
        <Part>
            <Content>
                
                <SettingsForm/>

            </Content>
        </Part>
        
    </Halves>
  )
}

export default Settings