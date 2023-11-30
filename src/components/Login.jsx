import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext
import "bootstrap/dist/css/bootstrap.css";
import loginbg from "../images/calculator.jpg";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, apiBaseUrl } = useAuth(); // Get the login function from AuthContext

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/login/login`, {
        username,
        password,
      });

      // const token = response.data.token;
      const token = response.data.token;
      // Call the login function with the token to set the user as authenticated
      login({ token });

      // Redirect to the desired route (e.g., '/home').
      navigate("/home");
    } catch (error) {
      // Handle login error (e.g., display an error message).
    }
  };

  return (
    <div
      className="  bg-light shadow "
      style={{
        borderRadius: "0px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        height:"100vh",
        width:"100%"
      }}
    >
      <img
        src={loginbg}
        className="shadow"
        alt="Card"
        style={{
          width: "100%",
          objectFit: "cover",
          borderRadius: "0px",
        }}
      />
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#ffff",
          fontFamily: "Poppins",
          padding: "40px",
        }}
      >
     <div className="m-5 p-5 shadow " style={{backgroundColor:"#00A3E0",width:"30%" ,border:"0px solid #000" ,borderRadius:"20px"}}>
            <div className="py-5" style={{fontSize:"32px"}}>Login </div>
            <div className="mb-3 ">
            <label  className="form-label ">
          Username
             </label>
              <input
                type="text"
                className="form-control shadow"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label  className="form-label">
         Password
             </label>
              <input
                type="password"
                className="form-control shadow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-warning  w-50  shadow" onClick={handleLogin}>
              Login
            </button>
            </div>
          </div>
        </div>
        </div>
     
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
