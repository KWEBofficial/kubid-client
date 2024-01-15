import { ProductThumbnailInfo } from "../../models/product";
import ItemListBody from "./ItemList/ItemListBody";
import ItemListHeader from "./ItemList/ItemListHeader";

interface ItemListProps {
  title: string;
  moreUrl: string;
  products: ProductThumbnailInfo[];
  moreTitle: string;
}

const ItemList: React.FC<ItemListProps> = ({ title, moreUrl, products, moreTitle }) => {
  return (
    <>
      <ItemListHeader title={title} moreUrl={moreUrl} moreTitle={moreTitle} />
      <ItemListBody products={products} />
    </>
  );
};

export default ItemList;
