
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { incrementProduct, decrementProduct, deleteProduct } from "../redux/cartRedux"; // Import the delete action
import { Link } from 'react-router-dom';


const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ width: "100%", marginBottom: "10px" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  ${mobile({ width: "100%" })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  padding: 10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  cursor: pointer;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  ${mobile({ width: "auto", height: "auto" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px", alignItems: "center" })}
`;

const ProductName = styled.span`
  ${mobile({ textAlign: "center" })}
`;

const ProductId = styled.span`
  ${mobile({ textAlign: "center" })}
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  ${mobile({ textAlign: "center" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ marginTop: "10px" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: auto;
  ${mobile({ width: "100%", marginTop: "20px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  ${mobile({ marginTop: "10px" })}
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch
  // const [cartQuantity, setCartQuantity] = useState(cart.quantity);

  const handleRedirect = (id) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  
  const handleIncrement = (id) => {
    dispatch(incrementProduct(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementProduct(id));
  };
  

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
           <TopButton type="filled">CHECKOUT NOW</TopButton> 
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail onClick={() => handleRedirect(product._id)}>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleIncrement(product._id)}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={() => handleDecrement(product._id)}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                  ₹ {product.price * product.quantity}
                  </ProductPrice>
                  <DeleteButton onClick={() => handleDelete(product._id)}>
                    Delete
                  </DeleteButton>
                </PriceDetail>
              </Product>
            ))}
            <Hr/>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Link to="/Checkout"><Button>CHECKOUT NOW</Button></Link>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
