import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../store/userReducer';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/RegisterPage';
import WelcomePage from '../pages/WelcomePage';

function App() {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state: any) => state.userReducer.currentUser);
    

  useEffect(() => {
    // fetch to server to check for a session cookie
    fetch('/login/auth')
      .then(res => res)
      .then(res => {
        // if the server returns a 200 status code, set CurrentUser (on State) to the response from the server, which is the logged in user's username
        if (res.status === 200) dispatch(setCurrentUser(res));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<WelcomePage/>}></Route>
      <Route path={'/loginpage'} element={<LoginPage/>}></Route>
      <Route path={'/signuppage'} element={<SignUpPage/>}></Route>
    </Routes>
  );
}

export default App;
