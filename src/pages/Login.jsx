import { useState } from "react";
import { signIn } from "../auth/auth";
import SEO from "../components/SEO.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await signIn(email, password);
    console.log(data, error);
  };

  return (
    <>
      <SEO
        title="JeviQR | Sign in"
        description="Log in to your JeviQR account to manage custom QR codes, automations, and real-time analytics."
        url="https://jeviqr.com/login"
      />
      <div className="mt-10 flex flex-col items-center gap-4">
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </>
  );
}

export default Login;
