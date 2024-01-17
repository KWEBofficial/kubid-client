/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const LinksInNav = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthPage = useLocation().pathname.includes("auth");

  const handleSignOut = () => {
    signOut();
    navigate("/");
    window.location.reload();
  };

  if (isAuthPage) return <></>;

  if (isAuthenticated()) {
    return (
      <nav>
        <Button type="text" onClick={handleSignOut}>
          로그아웃
        </Button>
        <Link to="/mypage">My Page</Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/auth/sign-in">
          <Button type="primary">로그인</Button>
        </Link>
        <Link to="/auth/sign-up">
          <Button>회원가입</Button>
        </Link>
      </nav>
    );
  }
};

export default LinksInNav;
