import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Wallet from "./components/Wallet";
import Transactions from './components/Transactions'

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";


const App = () => {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    

    if (user) {
      setCurrentUser(user);
      
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          GoHighLevel
        </Link>
        <div className="navbar-nav mr-auto">
          

          {currentUser && (
            <>
            <li className="nav-item">
              <Link to={"/wallet"} className="nav-link">
                Wallet
              </Link>
            </li>
            
            </>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.email}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transactions/:id" element={<Transactions/>}/>
        </Routes>
      </div>

      <AuthVerify logOut={logOut}/>
    </div>
  );
};

export default App;
