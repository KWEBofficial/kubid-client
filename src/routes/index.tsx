import { Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import ProductRegister from "../pages/ProductRegister/ProductRegister";

/**
 * 어느 url에 어떤 페이지를 보여줄지 정해주는 컴포넌트입니다.
 * Routes 안에 Route 컴포넌트를 넣어서 사용합니다.
 */
const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/products" element={<ProductRegister />} />
    </Routes>
  );
};

export default RouteComponent;
