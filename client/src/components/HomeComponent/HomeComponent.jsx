import React from "react";
import "./HomeComponent.css";
import arrow from "../Assets/arrow.png";
import shoppingBag from "../Assets/ShoppingBag.png";
import { Link } from "react-router-dom";

const HomeComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="home">
      <div className="home-left">
        <h1 className="lefth1">
          歡迎👋<br></br>
          {currentUser && currentUser.user.username}
        </h1>
        <h2>
          在這個網站上出售<br></br>以及購買您的商品
        </h2>
        {!currentUser && (
          <Link to="/Login">
            <div className="home-btn">
              <div>立即登入開始使用</div>
              <img src={arrow} alt=""></img>
            </div>
          </Link>
        )}
        {currentUser && (
          <Link to="/item">
            <div className="home-btn">
              <div>開始購買商品</div>
              <img src={arrow} alt=""></img>
            </div>
          </Link>
        )}
      </div>
      <div className="home-right">
        <img src={shoppingBag}></img>
      </div>
    </div>
  );
};

export default HomeComponent;
