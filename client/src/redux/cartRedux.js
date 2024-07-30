import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === productId
      );
      if (productIndex >= 0) {
        const deletedProduct = state.products[productIndex];
        const deletedQuantity = deletedProduct.quantity;
    
        // Ensure that deleted quantity does not exceed overall cart quantity
        if (deletedQuantity <= state.quantity) {
          state.quantity -= deletedQuantity;
        } else {
          state.quantity = 0;
        }
    
        state.total -= deletedProduct.price * deletedQuantity;
        state.products.splice(productIndex, 1);
      }
      
    },
    
    incrementProduct: (state, action) => {
      const product = state.products.find(item => item._id === action.payload);
      if (product) {
        product.quantity += 1;
        state.total += product.price;
      }
    },
    decrementProduct: (state, action) => {
      const product = state.products.find(item => item._id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.total -= product.price;
        }
      }
      
    },
    setCart: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    }
  },
});

export const { addProduct, clearCart, deleteProduct, incrementProduct, decrementProduct, setCart } = cartSlice.actions;
export default cartSlice.reducer;
