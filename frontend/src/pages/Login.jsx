import "../styles/login.css";
// import { Register } from "./Register";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Login() {
  return (
    <form action="">
      <input
        type="email"
        name="email-input"
        id="email-input"
        placeholder="Enter your email please"
      />
      <input
        type="password"
        name="pass-input"
        id="pass-input"
        placeholder="Enter your password please"
      />
      <div className="register-container">
        <p>
          <a href="">
            Don't have an account?
          </a>
        </p>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
