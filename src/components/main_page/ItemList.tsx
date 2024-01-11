import { ProductThumbnailInfo } from "../../models/product";
import ItemListBody from "./ItemList/ItemListBody";
import ItemListHeader from "./ItemList/ItemListHeader";

interface ItemListProps {
  title: string;
  moreUrl: string;
  products: ProductThumbnailInfo[];
}

const ItemList: React.FC<ItemListProps> = ({ title, moreUrl, products }) => {
  return (
    <>
      <ItemListHeader title={title} moreUrl={moreUrl} />
      <ItemListBody products={products} />
    </>
  );
};

export default ItemList;
