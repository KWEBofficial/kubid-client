import HigherLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/main_page/ItemList/ItemList";
import SearchSection from "../components/main_page/SearchSection";

const Main = () => {
  return (
    <div style={{ width: "900px", margin: "auto" }}>
      <SearchSection />
      <ItemList title="최근에 올라온 거예요" moreUrl="" />
    </div>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;
