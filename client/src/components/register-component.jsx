import React, { useState } from "react";
import AuthService from "../services/auth.serveice";
//重新導向功能
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  //預處理提交表單時默認提交並導向其他地方
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(email, username, password)
      .then(() => {
        window.alert("註冊成功，您現在將被導向到登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="exampleInputUsername" className="form-label">
          用戶名稱
        </label>
        <input
          onChange={handleUsername}
          type="text"
          className="form-control"
          id="exampleInputUsername"
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

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>

      <button onClick={handleRegister} className="btn btn-primary">
        註冊
      </button>
    </form>
  );
};

export default RegisterComponent;
