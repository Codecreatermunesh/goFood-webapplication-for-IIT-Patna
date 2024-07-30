import React from "react";
import { useParams } from "react-router-dom";
import profile from "../Images/profile.jpg";
import styled from "styled-components";
import UserSidebar from "./UserProfile/UserSidebar";
import AccountSettings from "./UserProfile/AccountSettings";
import UpdateSettings from "./UserProfile/UpdateSettings";
import YourOrders from "./UserProfile/YourOrders";
import Address from "./UserProfile/Address";
import ChangePassword from "./UserProfile/ChangePassword";

const Container = styled.div`
  background-color: white;
  padding-top: 10vh;
  padding-bottom: 3vh;
  margin: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const Name = styled.div`
  margin-top: 5px;
  color: black;
`;

const Left = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Right = styled.div`
  width: 60%;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
`;

const Sidebar = styled.div`
  border: 1px solid rgb(207, 207, 207);
  min-height: 50vh;
  width: 100%;
  border-radius: 5px;
  margin-top: 3vh;
`;

function Profile() {
  const { activepage } = useParams();
  return (
    <Container>
      <Left>
        <Image src={profile} alt="Profile" />
        <Name>Satoru Gojo</Name>
        <Sidebar>
          <UserSidebar activepage={activepage} />
        </Sidebar>
      </Left>
      <Right>
        {activepage === "accountsettings" && <AccountSettings />}
        {activepage === "updatesettings" && <UpdateSettings />}
        {activepage === "yourorders" && <YourOrders />}
        {activepage === "address" && <Address />}
        {activepage === "changepassword" && <ChangePassword />}
      </Right>
    </Container>
  );
}

export default Profile;
