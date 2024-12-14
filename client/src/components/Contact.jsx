import React from "react";
import styled from "styled-components";
import contactImage1 from "../Images/contact_munesh.jpeg";
// import contactImage2 from "../Images/contactImage2.jpg";
// import contactImage3 from "../Images/contactImage3.jpg";
// import contactImage4 from "../Images/contactImage4.jpg";

const Container = styled.div`
  margin: auto;
  padding: 1rem 1.5rem 3rem;
  background-color: white;
  color: black;

  @media (min-width: 768px) {
    padding: 1.5rem 2.5rem 4rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 3rem 6rem;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem 3rem;

  @media (min-width: 768px) {
    flex-basis: 40%;
    padding: 1.5rem 2.5rem 4rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 3rem 6rem;
  }
`;

const LargeImage = styled.div`
  background-image: url(${contactImage1});
  background-size: cover;
  background-position: center;
  grid-row: 1 / 5;
  grid-column: 1 / 3;
  
`;

const BottomLeftImage = styled.div`
  background-image: url(${contactImage1});
  background-size: cover;
  background-position: center;
  grid-row: 3 / 5;
  grid-column: 1 / 2;
  height: 16rem;
`;

const BottomRightTopImage = styled.div`
  background-image: url(${contactImage1});
  background-size: cover;
  background-position: center;
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  height: 7.5rem;
`;

const BottomRightBottomImage = styled.div`
  background-image: url(${contactImage1});
  background-size: cover;
  background-position: center;
  grid-row: 4 / 5;
  grid-column: 2 / 3;
  height: 7.5rem;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1rem 1.5rem 3rem;

  @media (min-width: 768px) {
    flex-basis: 40%;
    padding: 1.5rem 2.5rem 4rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem 3rem 6rem;
  }
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
`;

function Contact() {
  return (
    <Container>
      <FlexWrap>
        <ImageGrid>
{/*           <LargeImage /> */}
          {/* <BottomLeftImage />
          <BottomRightTopImage />
          <BottomRightBottomImage /> */}
        </ImageGrid>
        <FormContainer>
          <Heading>Contact Us</Heading>
          <Form action="#">
            <Input name="Name" type="text" placeholder="Enter your name" />
            <Input name="Phone" type="text" placeholder="Enter your Phone no." />
            <Input name="Email" type="email" placeholder="Enter your email" />
            <TextArea name="Message" placeholder="Message" rows="5" />
            <SubmitButton>Submit</SubmitButton>
          </Form>
        </FormContainer>
      </FlexWrap>
    </Container>
  );
}

export default Contact;
