import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

// import pages
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// import redux hooks and action creators
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { increment, incrementByAmount } from '../features/counter/counterSlice';

const App = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(increment());
    dispatch(incrementByAmount(3));
  }

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;