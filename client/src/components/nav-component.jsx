import React from "react";
import { Link } from "react-router-dom";
import AuthServeice from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthServeice.logout();
    window.alert("登出成功，即將被導向首頁");
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" a="/">
          <img src="logo.png" alt="logo" width={90} height={40} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                首頁
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/item">
                商品一覽
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  註冊
                </Link>
              </li>
            )}

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  登入
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  選項
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      個人頁面
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/postItem">
                      我要刊登
                    </Link>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      登出
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
