import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainpage";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import ProductRegister from "../pages/ProductRegister/ProductRegister";
import MyPage from "../pages/MyPage";
import ProductRegister from "../pages/ProductRegister/ProductRegister";
import PasswordChangePage from "../pages/PasswordChange";
import SearchPage from "../pages/searchpage";

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
      <Route path="/products/register" element={<ProductRegister />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/users/current-user/password" element={<PasswordChangePage />} />
      <Route path="/products" element={<SearchPage />} />
    </Routes>
  );
};

export default RouteComponent;
