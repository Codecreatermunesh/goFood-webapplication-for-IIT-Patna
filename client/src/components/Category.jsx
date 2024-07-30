import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Japan from "../Images/Japan.jpg";
import London from "../Images/London.jpg";
import Norway from "../Images/Norway.jpg";

const Section = styled.section`
  &.discover {
    padding: 2rem 0;
    background-color: white;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 800;
  font-family: var(--header-font);
  text-align: center;
  color: black;
`;

const Subheader = styled.p`
  max-width: 600px;
  text-align: center;
  color: black;
`;

const Grid = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Card = styled.div`
  max-width: calc(100% - 2rem);
  margin-bottom: 2rem;

  @media only screen and (min-width: 768px) {
    max-width: calc(33.33% - 2rem);
    flex: 1;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  text-align: center;

  h4 {
    font-size: 2rem;
    font-weight: 800;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  outline: none;
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    border: 1px solid white;
    background-color: black;
    color: white;
    transition: 300ms;
  }
`;

function Category() {
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  useEffect(() => {
    ScrollReveal().reveal(".discover__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    ScrollReveal().reveal(".discover__card__content", {
      ...scrollRevealOption,
      interval: 500,
      delay: 200,
    });
  }, [scrollRevealOption]);

  return (
    <Section className="discover" id="discover">
      <Container className="section__container discover__container">
        <Header className="section__header">Discover the most engaging robotic kits</Header>
        <Subheader className="section__subheader">
          Let's introduce the world of robotics to the kids.
        </Subheader>
        <Grid className="discover__grid">
          <Card className="discover__card">
            <ImageWrapper className="discover__image">
              <img src={Norway} alt="discover" />
            </ImageWrapper>
            <CardContent className="discover__card__content">
              <h4 style={{color: "black"}}>Beginner</h4>
              <p style={{color: "black"}}>For ages 6+</p>
              <Link to={`/Products?proudct.category=product.category1`}>
                <Button className="discover__btn">
                  Discover More <i className="ri-arrow-right-line"></i>
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="discover__card">
            <ImageWrapper className="discover__image">
              <img src={London} alt="discover" />
            </ImageWrapper>
            <CardContent className="discover__card__content">
              <h4 style={{color: "black"}}>Intermediate</h4>
              <p style={{color: "black"}}>For ages 9+</p>
              <Button className="discover__btn">
                Discover More <i className="ri-arrow-right-line"></i>
              </Button>
            </CardContent>
          </Card>
          <Card className="discover__card">
            <ImageWrapper className="discover__image">
              <img src={Japan} alt="discover" />
            </ImageWrapper>
            <CardContent className="discover__card__content">
              <h4 style={{color: "black"}}>Advanced</h4>
              <p style={{color: "black"}}>For ages 12+</p>
              <Button className="discover__btn">
                Discover More <i className="ri-arrow-right-line"></i>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

export default Category;
