import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from '../../requestMethods';
import axios from "axios";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Updated = styled.span`
  color: green;
`;

function UpdateSettings() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [res, setRes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await publicRequest.get("/users/load", { withCredentials: true });
        const userData = response.data;
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setPhone(userData.phone);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  const handleUpdateClick = async (e) => {
    // e.preventDefault(); // Prevent form submission

    try {
      const updatedUser = {
        username: username || user.username,
        phone: phone || user.phone,
        // Add other fields if necessary
      };

      res = await publicRequest.put("/users", updatedUser, { withCredentials: true });
      setRes(res);
      alert("Details updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update details");
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Render loading state while user data is being fetched
  }

  return (
    <Container>
      <Wrapper>
        <Title>UPDATE DETAILS</Title>
        <Form>
          <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {/* <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
          <Input placeholder="phone no." value={phone} onChange={(e) => setPhone(e.target.value)} />
          {/* <Input type="password" placeholder="current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input type="password" placeholder="new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> */}

          <Agreement>
            Update the details you want to change otherwise leave it blank. Creating new password requires <b>current password</b>
          </Agreement>
          {res && <Updated>Updated</Updated>}
          <Button onClick={handleUpdateClick}>UPDATE DETAILS</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default UpdateSettings;
