import { signUp } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { myImages } from "../imports/images";
import { useUser } from "../context/UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { user, isAuthReady } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthReady) return;
    if (user) navigate("/");
  }, [isAuthReady, user, navigate]);

  const handleRegister = async () => {
    if (isAuthReady && user) return;
    if (passwordConfirmation !== password)
      return console.log("Password don't match");

    const { data, error } = await signUp(email, password, firstName, lastName);
    console.log(data, error);
    navigate("/");

    return;
  };
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-(--bg-color) ">
        <div className="flex  items-center justify-center h-7/8 p-5 bg-(--interfaceColor) shadow-sm rounded-2xl w-6/8 gap-2 border border-amber-50/20">
          <div className="w-full h-full  items-center justify-center border-r border-amber-50/20 hidden md:flex  ">
            <img src={myImages.authImage4} className="w-full h-auto" />
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center h-full">
            <div className="flex flex-col w-5/8 z-1 absolute  h-full  md:hidden">
              <img
                src={myImages.authImage3}
                className="w-5/8 h-auto  opacity-35 z-1 "
              />
            </div>

            <div className="text-5xl font-semibold mb-2 z-10 ">Register</div>
            <div className="flex flex-col w-5/8 z-10">
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                label={"First Name"}
                placeholder={"First name"}
                type={"text"}
                padding={"p-4 py-5"}
              />
            </div>
            <div className="flex flex-col w-5/8 z-10 ">
              <Input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                label={"Last Name"}
                placeholder={"Last name"}
                type={"text"}
                padding={"p-4 py-5"}
              />
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label={"Email"}
                placeholder={"youremail@example.com"}
                type={"email"}
                padding={"p-4 py-5"}
              />
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label={"Password"}
                placeholder={"Password"}
                type={"password"}
                padding={"p-4 py-5"}
              />
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                label={"Password Confirmation"}
                placeholder={"Password"}
                type={"password"}
                padding={"p-4 py-5"}
              />
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Button
                selected={true}
                margin={"mt-2"}
                height={"h-10"}
                onClick={() => handleRegister()}
              >
                Register
              </Button>
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Button
                secondary
                margin={"mt-2"}
                height={"h-10"}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
