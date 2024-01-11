import ItemListBody from "./ItemListBody";
import ItemListHeader from "./ItemListHeader";

interface ItemListProps {
  title: string;
  moreUrl: string;
}

const ItemList: React.FC<ItemListProps> = ({ title, moreUrl }) => {
  return (
    <>
      <ItemListHeader title={title} moreUrl={moreUrl} />
      <ItemListBody />
    </>
  );
};

export default ItemList;
