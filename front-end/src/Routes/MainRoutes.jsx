import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "../Components/ForgetPassword";
import Blog from "../Pages/Blog";
import Homepage from "../Pages/Homepage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import UserBlog from "../Pages/UserBlog";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/blog/:blogId" element={<Blog />} />
      <Route path="/blogs/:userId" element={<UserBlog />} />
    </Routes>
  );
};

export default MainRoutes;
