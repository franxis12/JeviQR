import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CanvasEditor from "./pages/CanvasEditor";
import CanvasPlayground from "./pages/CanvasPlayground";
import { supabase } from "./auth/supabaseClient";
import Register from "./pages/Register";

function App() {
  async function testConnection() {
    const conection = await supabase.from("users").select("*");
    console.log(conection);
  }
  testConnection();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<CanvasEditor />} />
        <Route path="/playground" element={<CanvasPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
