import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { getCartItems } from './features/cart/cartSlice';
// import { calculateTotals } from './features/cartSlice';

function App() {
  /*  const { cartItems, isOpen } = useSelector((store) => ({
    ...store.cartReducer,
    ...store.modalReducer,
  })); */

  const { isOpen, isLoading } = useSelector((store) => ({
    ...store.modalReducer,
    ...store.cartReducer,
  }));

  /*
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]); */

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getCartItems());
    dispatch(getCartItems('Hello World'));
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
