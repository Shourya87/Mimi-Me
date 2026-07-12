import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';

export default function App() {

  // Backend Testing Code - 
  // useEffect(() => {

  //   axios
  //   .get("http://localhost:3000/api/test")
  //   .then((res) => console.log(res.data))
  //   .catch(console.error);

  // },[])

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>

    </BrowserRouter>
  )
}
