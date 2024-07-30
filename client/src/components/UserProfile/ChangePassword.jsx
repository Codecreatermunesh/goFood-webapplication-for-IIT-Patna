import React, { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../requestMethods";

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

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [res, setRes] = useState(null);
  

  const handleUpdateClick = async (e) => {
    // e.preventDefault(); // Prevent form submission

    try {
      

      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      const res = await publicRequest.put("/users/change-password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      }, { withCredentials: true });

      setRes(res.data);
      alert("Password updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CHANGE PASSWORD</Title>
        <Form>
          <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <Agreement>
            To change your password, please enter your current password for verification, then enter a new password and confirm it.
          </Agreement>
          {res && <Updated>Password updated successfully!</Updated>}
          <Button onClick={handleUpdateClick}>UPDATE PASSWORD</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default ChangePassword