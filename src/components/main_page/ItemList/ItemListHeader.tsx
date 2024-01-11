import { Link } from "react-router-dom";

interface ItemListHeaderProps {
  title: string;
  moreUrl: string;
}

const ItemListHeader: React.FC<ItemListHeaderProps> = ({ title, moreUrl }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p style={{ margin: 0 }}>
        <Link to={moreUrl}>더보기</Link>
      </p>
    </div>
  );
};

export default ItemListHeader;
