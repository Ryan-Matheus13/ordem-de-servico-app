import React, { useState } from "react";
import "./Login.css";

import { useNavigate, useLocation } from "react-router-dom";

import { axiosInstance } from "../../axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { setAccessToken, setCSRFToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivateInstance = useAxiosPrivate();
  const fromLocation = location?.state?.from?.pathname || "/dashboard";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  async function getUser() {
    const { data } = await axiosPrivateInstance.get("user");

    localStorage.setItem("user", data.username);
    localStorage.setItem("cargo", data.cargo);
  }

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function onSubmitForm(event) {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        "login",
        JSON.stringify({
          email,
          password,
        })
      );

      getUser();
      setAccessToken(response?.data?.access_token);
      setCSRFToken(response.headers["x-csrftoken"]);
      setEmail();
      setPassword();

      navigate(fromLocation, { replace: true });

      localStorage.setItem(
        "access-token",
        JSON.stringify(response.data.access_token)
      );
      localStorage.setItem(
        "refresh-token",
        JSON.stringify(response.data.refresh_token)
      );
      localStorage.setItem(
        "x-csrftoken",
        JSON.stringify(response.headers["x-csrftoken"])
      );
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  }

  return (
    <div className="container">
      <div className="content-container">
        <div className="img-container"></div>
        <form className="form-container" onSubmit={onSubmitForm}>
          <h2 className="title-form">Adminitração</h2>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              className="form-control"
              id="email"
              onChange={onEmailChange}
            />
          </div>
          <div className="input-container">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              className="form-control"
              id="password"
              onChange={onPasswordChange}
            />
          </div>
          <div>
            <span>{message}</span>
          </div>
          <button className="btn" type="submit">
            <span>

            ENTRAR
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
