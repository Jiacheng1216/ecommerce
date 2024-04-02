import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import "./login-component.css";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，您現在將被重新導向個人資料頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div className="loginPage">
      <form
        className="loginForm"
        onSubmit={handleSubmit}
        style={{ padding: "5rem" }}
      >
        <div className="loginInput">
          <div className="mb-3">
            {message && <div className="alert alert-danger">{message}</div>}
            <label htmlFor="exampleInputEmail1" className="form-label">
              電子信箱
            </label>

            <input
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              密碼
            </label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="LoginAndRegister">
            <button className="btn btn-primary" onClick={handleLogin}>
              登入
            </button>

            <label className="form-check-label">
              沒有帳戶嗎?<Link to={"/register"}>註冊</Link>一個
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
