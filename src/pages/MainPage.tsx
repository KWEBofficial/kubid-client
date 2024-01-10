import HigherLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/main_page/ItemList";
import SearchSection from "../components/main_page/SearchSection";

const Main = () => {
  return (
    <div style={{ width: "900px", margin: "auto" }}>
      <SearchSection />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>가장 핫한 🔥</h2>
        <p style={{ margin: 0 }}>더보기</p>
      </div>
      <ItemList />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>최근에 올라온 거예요</h2>
        <p style={{ margin: 0 }}>더보기</p>
      </div>
      <ItemList />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>컴퓨터학과에서 많이 보고 있어요</h2>
        <p style={{ margin: 0 }}>더보기</p>
      </div>
      <ItemList />
    </div>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;
