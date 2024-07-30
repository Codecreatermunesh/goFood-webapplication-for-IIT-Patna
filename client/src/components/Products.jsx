import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Product from "./Product";
import axios from "axios";
import { mobile } from "../responsive";

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  margin-bottom: 10px; // Add margin-bottom to create space
  ${mobile({ marginRight: "0px" })}
`;

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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const LeftFilter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CenterFilter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px 20px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://gofood-hp8t.onrender.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = [...products];
      if (filter.category) {
        updatedProducts = updatedProducts.filter((item) =>
          item.categories.includes(filter.category)
        );
      }
      if (searchTerm) {
        updatedProducts = updatedProducts.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredProducts(updatedProducts);
    };
    filterProducts();
  }, [filter, searchTerm, products]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <FilterContainer>
        <LeftFilter>
          <FilterText>Category:</FilterText>
          <Select name="category" onChange={handleFilterChange}>
            <Option value="">All</Option>
            <Option value="Veg">Veg</Option>
            <Option value="Non-Veg">Non veg</Option>
            
          </Select>

          
        </LeftFilter>
        <div style={{ flex: 1 }} />
        <CenterFilter>
          <SearchInputContainer>
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchInputContainer>
        </CenterFilter>
        <div style={{ flex: 1 }} />
      </FilterContainer>
      <Container>
        <Title>Our Products</Title>
        <ProductGrid>
          {filteredProducts.map((item) => (
            <Product key={item._id} item={item} />
          ))}
        </ProductGrid>
      </Container>
    </>
  );
};

export default Products;
