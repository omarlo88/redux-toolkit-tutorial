import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { closeModal, openModal } from '../modal/modalSlice';

const initialState = {
  // cartItems: cartItems,
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const url = 'https://course-api.com/react-useReducer-cart-project';

/*No param
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  /* return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err)); */
/*
  try {
    const resp = await axios(url);
    console.log(resp.data);
    return resp.data;
  } catch (error) {}
});*/

// With param is the first param
/*
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name) => {
    /* return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err)); */
/*
    try {
      console.log(name);

      const resp = await axios(url);
      return resp.data;
    } catch (error) {}
  }
);*/

// can access also to thunkAPI param
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    /* return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err)); */

    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());

      // thunkAPI.dispatch(openModal());
      // thunkAPI.dispatch(closeModal());

      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error, check your url');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clerCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  /* extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
      console.log(action);
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  }, */
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
        console.log(action);
      })
      .addCase(getCartItems.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

// console.log(cartSlice);

export const {
  clerCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
