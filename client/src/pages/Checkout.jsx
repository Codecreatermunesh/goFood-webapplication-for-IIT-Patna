import * as React from 'react';

import AddressForm from '../components/CheckoutAddressForm';
import CheckoutReview from '../components/CheckoutReview';
import styled from "styled-components";
import { mobile } from "../responsive";



const Halves = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}

`;

const Adjust = styled.div`
  padding: 10vh
  
`;

const Adj = styled.div`
  width: 1000px
  
`;



const Checkout=()=> {
  
  return (
    <div>
        <div>
            Billing
        </div>
        <Halves>
          <Adj>
            <Adjust>
              <AddressForm/>
            </Adjust>  
          </Adj>
            <CheckoutReview/>
        </Halves>
        <div>
            Previous
        </div>
    </div>
  );
}

export default Checkout;