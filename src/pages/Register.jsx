import { signUp } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password === passwordConfirmation) {
      const { data, error } = await signUp(
        email,
        password,
        firstName,
        lastName
      );
      console.log(data, error);
      navigate("/");
    }
    console.log("Password don't match");

    return;
  };
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-blue-500 ">
        <div className="flex flex-col items-center justify-center h-100 p-2 bg-amber-400 w-100 gap-2">
          <div>Register</div>
          <div className="flex flex-col ">
            <label>Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 bg-white text-black"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col ">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 bg-white text-black"
              placeholder="Last name"
            />
          </div>
          <div className="flex flex-col ">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-white text-black"
              placeholder="email"
            />
          </div>
          <div className="flex flex-col ">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-white text-black"
              placeholder="password"
            />
          </div>
          <div className="flex flex-col ">
            <label>Password Confirmation</label>
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="p-2 bg-white text-black"
              placeholder="password confirmation"
            />
          </div>
          <button onClick={() => handleRegister()} className="bg-green-400 p-2">
            Register
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
