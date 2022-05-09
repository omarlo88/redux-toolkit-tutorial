import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
// import { calculateTotals } from './features/cartSlice';

function App() {
  /*  const { cartItems, isOpen } = useSelector((store) => ({
    ...store.cartReducer,
    ...store.modalReducer,
  })); */

  const { isOpen } = useSelector((store) => ({
    ...store.modalReducer,
  }));

  /*
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]); */

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
