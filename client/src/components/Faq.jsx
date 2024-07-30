import React, { useState } from "react";
import styled from "styled-components";
import { questions } from "../questions";
import FaqCard from "./FaqCard";

const Container = styled.div`
  padding: 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: black;
`;

const Title = styled.p`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

const Content = styled.div`
  margin: 0% 25% 0%;
  padding-top: 20px;
`;

function Faq() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);
  };

  return (
    <Container>
      <Title>Frequently Asked Questions</Title>
      <Content>
        {questions.map((qItem, index) => (
          <FaqCard
            key={qItem.key}
            expanded={expanded === 'panel' + index}
            onChange={handleChange('panel' + index)}
            question={qItem.question}
            answer={qItem.answer}
            blueBackground={true}
          />
        ))}
      </Content>
    </Container>
  );
}

export default Faq;
