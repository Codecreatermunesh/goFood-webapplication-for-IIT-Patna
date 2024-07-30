import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #003d5c;
  text-align: center;
`;

const Title = styled.p`
  color: white;
  margin-bottom: 20px;
  font-size: 45px; 
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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

const products = [
  {
    id: 1,
    name: "Burger king",
    description: "Short description about that product",
    price: "₹ 70",
    image: "https://menupages.ae/uploads/573/1_1598532338_cover.webp"
  },
  {
    id: 2,
    name: "Pastery",
    description: "Short description about that product",
    price: "₹ 40",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Jalebi",
    description: "Short description about that product",
    price: "₹ 80",
    image: "https://guptas.co.uk/cdn/shop/files/00100lrPORTRAIT_00100_BURST20200731134617132_COVER_2000x.jpg?v=1613560109"
  },
  {
    id: 4,
    name: "Cold Coffe",
    description: "Short description about that product",
    price: "₹ 65",
    image: "https://www.milkmaid.in/sites/default/files/2024-05/Cold-Coffee-335x300.jpg"
  }
];

const ProductList = () => {
  return (
    <Container>
      <Title>Our Products</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price}</ProductPrice>
              <BuyButton>Buy/ CTA</BuyButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
      <Link to="/Products">
      <ExploreButton>Explore more &gt;&gt;</ExploreButton>
    </Link>
    </Container>
  );
};

export default ProductList;
