import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import styled from 'styled-components';

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <SliderSection>
      <LeftArrow onClick={prevSlide} />
      <RightArrow onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <Slide key={index} className={index === current ? 'slide active' : 'slide'}>
            {index === current && (
              <SlideContent>
                <Image src={slide.image} alt='travel image' />
                <Overlay />
                <TextContent>
                  <Title>{slide.title}</Title>
                  <Text>{slide.text}</Text>
                </TextContent>
              </SlideContent>
            )}
          </Slide>
        );
      })}
    </SliderSection>
  );
};

const SliderSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Image = styled.img`
  width: 1000px;
  height: 600px;
  border-radius: 10px;
  object-fit: cover;
`;

const LeftArrow = styled(FaArrowAltCircleLeft)`
  position: absolute;
  top: 50%;
  font-size: 3rem;
  color: black;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  left: 32px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const RightArrow = styled(FaArrowAltCircleRight)`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  color: black;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Slide = styled.div`
  opacity: 0;
  transition-duration: 1s ease;
  position: absolute;
  &.active {
    opacity: 1;
    transition-duration: 1s;
    transform: scale(1.08);
  }
`;

const SlideContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const TextContent = styled.div`
  position: absolute;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default Slider;
