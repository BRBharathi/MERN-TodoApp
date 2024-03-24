import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signupFailed, setSignupFailed] = useState(false);

  const onSignUp = async (name, email, password) => {
    try {
      const baseUrl = process.env.BASE_URL;
      const response = await fetch("https://mern-todoapp-by3e.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Sign up successful", data);
        window.alert("Successfully signedup");
        navigate("/login");
      } else {
        window.alert("Signup Failed,try again");
        setEmail("");
        setName("");
        setPassword("");

        setSignupFailed(true);
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignUp(name, email, password);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="col-lg-4 border p-4 rounded">
        <h1 className="mb-4 text-center">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="name"
              className="form-control"
              placeholder="Username"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
