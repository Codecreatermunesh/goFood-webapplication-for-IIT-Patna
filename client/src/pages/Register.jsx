import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https/.................")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
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

const Error = styled.span`
  color: red;
`;

const Other = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notEqual, setNotEqual] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

  const handleClick = async(e) => {
    e.preventDefault();
    if (password===confirmPassword){
      try {
        const res = await publicRequest.post("/auth/register", {username,email,password});
        // login(dispatch, { username, password });
      } catch (err) {
        console.log(err);
        
      }
    }else {
      setNotEqual(true);
    }
    login(dispatch, { username, password });
  };



  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="confirm password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} >CREATE</Button>
          {/* {(notEqual&&!error) && <Error>Password does not match the confirm password</Error>} */}
          {(error) && <Error>Something went wrong...</Error>}
          <Other><Link to="/Login">ALREADY HAVE AN ACCOUNT?</Link></Other>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register