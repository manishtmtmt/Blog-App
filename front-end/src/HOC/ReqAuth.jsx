import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ReqAuth = ({ children }) => {
  let location = useLocation();
  let isAuth = useSelector((state) => state.authReducer.isAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  } else return children;
};

export default ReqAuth;