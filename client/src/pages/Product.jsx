import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import RecommendedCourses from "../components/RecommendedCourses";

import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: teal;
`;

const Desc = styled.p`
  margin: 20px 0;
  color: #555;
  line-height: 1.6;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  background-color: teal;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e7c7a;
  }
`;

const Amount = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: teal;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("https://gofood-hp8t.onrender.com/api/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const checkProductInCart = () => {
      const productInCart = cart.find((item) => item._id === id);
      setIsInCart(!!productInCart);
    };
    checkProductInCart();
  }, [cart, id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      if (quantity < product.stockNo)  setQuantity(quantity + 1);
    } 
  };

  const handleClick = () => {
    if (!isInCart) {
      dispatch(addProduct({ ...product, quantity }));
    }
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Price>Rs {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>
              {isInCart ? "Already in the cart" : "ADD TO CART"}
            </Button>
          </AddContainer>
          <Desc>
            {product.desc}
          </Desc>
        </InfoContainer>
      </Wrapper>
      <RecommendedCourses category={product.category} />
    </Container>
  );
};

export default Product;
