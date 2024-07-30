import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const ProductCard = styled.div`
  background-color: #054d72;
  border-radius: 10px;
  overflow: hidden;
  width: 23%;
  margin-bottom: 20px;
  color: white;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

const BuyButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;

const ExploreButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;

const Product = ({ item }) => {
  return (
      <ProductCard key={item.id}>
        <ProductImage src={item.img} alt={item.name} />
        <ProductInfo>
          <ProductName>{item.title}</ProductName>
          <ProductDescription>
             Order your favorite food online with fast delivery to your door, making dining easy.
          </ProductDescription>
          <ProductPrice>Rs. {item.price}</ProductPrice>
          <Link to={`/Product/${item._id}`}>
            <BuyButton>More Info</BuyButton>
          </Link>
        </ProductInfo>
      </ProductCard>
  );
};

export default Product;
