import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  width: 80%;
  margin: auto;
  padding-top: 50px;
  background-color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SlideImage = styled.img`
  width: 100%;
  max-width: 300px; 
  height: auto;
  border-radius: 8px;
`;

const SlideTitle = styled.h3`
  margin-top: 20px;
  text-align: center;
`;

const SlideText = styled.p`
  text-align: center;
  color: #666;
`;

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <CarouselContainer>
      <SectionTitle>goFood Offers</SectionTitle>
      <Slider {...settings}>
        <div>
          <SlideContent>
            <SlideImage src={robot1} alt="Thumbs up" />
            <SlideText>Thumbs up 63%</SlideText>
          </SlideContent>
        </div>
        <div>
          <SlideContent>
            <SlideImage src={robot2} alt="About fast food & Junk food" />
            <SlideTitle>About fast food & Junk food</SlideTitle>
            <SlideText>
              High in calories and unhealthy fats, junk food contributes to obesity and weight-related issues. Regular consumption of junk food can elevate the risk of heart disease, diabetes, and hypertension.
            </SlideText>
          </SlideContent>
        </div>
        <div>
          <SlideContent>
            <SlideImage src={robot3} alt="About Cold Drinks" />
            <SlideTitle>About Cold Drinks</SlideTitle>
            <SlideText>
            Soft drinks has far more serious health issues are turned into many type of diseases such as Diabetes, body weight, heart disease, liver damage, bone health, among children and aged persons.
            </SlideText>
          </SlideContent>
        </div>
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
