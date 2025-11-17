import { useState, useEffect } from "react";
import { signIn } from "../auth/auth";
import SEO from "../components/SEO.jsx";
import { useNavigate } from "react-router-dom";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { myImages } from "../imports/images";
import { useUser } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, isAuthReady } = useUser();

  useEffect(() => {
    if (isAuthReady) {
      if (user) navigate("/");
    }
  }, [isAuthReady, user, navigate]);

  const handleLogin = async () => {
    const { data, error } = await signIn(email, password);
    console.log(data, error);
    navigate("/");
  };

  return (
    <>
      <SEO
        title="JeviQR | Sign in"
        description="Log in to your JeviQR account to manage custom QR codes, automations, and real-time analytics."
        url="https://jeviqr.com/login"
      />
      <div className="flex items-center justify-center w-screen h-screen bg-(--bg-color)">
        <div className="flex items-center justify-center h-7/8 p-5 bg-(--interfaceColor) shadow-sm rounded-2xl w-6/8 gap-2 border border-amber-50/20">
          <div className="w-full h-full items-center justify-center border-r border-amber-50/20 hidden md:flex">
            <img src={myImages.authImage3} className="w-full h-auto" />
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center h-full relative">
            <div className="flex flex-col w-5/8 z-1 absolute h-full md:hidden">
              <img
                src={myImages.authImage4}
                className="w-5/8 h-auto opacity-35 z-1"
              />
            </div>
            <div className="text-5xl font-semibold mb-2 z-10 ">Login</div>
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
              <Button
                selected={true}
                margin={"mt-2"}
                height={"h-10"}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <div className="flex flex-col w-5/8 z-10">
              <Button
                secondary
                margin={"mt-2"}
                height={"h-10"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
