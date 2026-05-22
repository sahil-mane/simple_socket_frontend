import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import Home from "./pages/Home"
import { useEffect } from "react";
import socket from "./config/socket"


function App() {

  const token = localStorage?.getItem("token");

  useEffect(() => {
    socket.auth = {
      token,
    }

    socket.connect()

    return () => {
      socket.disconnect();
    }
  }, [token])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
