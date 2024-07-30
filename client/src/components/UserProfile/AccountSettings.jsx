import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  width: 300px; /* Set a fixed width for uniformity */
`;

const Label = styled.label`
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #333; /* Darker color for labels */
  margin-right: 10px;
`;

const Span = styled.span`
  flex: 2;
  font-size: 1rem;
  color: #666; /* Slightly lighter color for text */
  background-color: #fff; /* White background */
  border: 1px solid #ccc; /* Light grey border */
  border-radius: 4px;
  padding: 8px 12px; /* Add padding for better appearance */
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: lightgreen; /* Light green background */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #32cd32; /* Darker green on hover */
  }
`;

function AccountSettings() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleUpdateClick = () => {
    navigate('/profile/updatesettings');
  };
  return (
    <Container>
      <FieldContainer>
        <Label>Username:</Label>
        <Span>{user.username}</Span>
      </FieldContainer>
    
      <FieldContainer>
        <Label>Email address:</Label>
        <Span>{user.email}</Span>
      </FieldContainer>

      <FieldContainer>
        <Label>Phone:</Label>
        <Span>{user.phone}</Span>
      </FieldContainer>
      <Button onClick={handleUpdateClick}>Update Details</Button>
    </Container>
  );
}

export default AccountSettings;
