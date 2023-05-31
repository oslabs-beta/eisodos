import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function loginPage() {
 const dispatch = useDispatch();
 const errorMessage = useSelector((state) => state.userReducer.errorMessage);
 const navigate = useNavigate();
}


function loginUser(username, password) {
 fetch('/api/users/login', {
   method: 'POST'
 })
}


export default LoginPage; 