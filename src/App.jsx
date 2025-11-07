import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CanvasEditor from "./pages/CanvasEditor";
import CanvasPlayground from "./pages/CanvasPlayground";
import { supabase } from "./auth/supabaseClient";

function App() {
  async function testConnection() {
    const { data, error } = await supabase.from("test").select("*");
    //console.log(data, error);
  }

  testConnection();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CanvasEditor />} />
        <Route path="/playground" element={<CanvasPlayground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
