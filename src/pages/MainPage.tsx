import HigherLayoutComponent from "../components/common/CustomLayout";

const Main = () => {
  return <div>This is Main Page</div>;
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;
