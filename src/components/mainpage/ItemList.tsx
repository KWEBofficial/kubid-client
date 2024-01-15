import { ProductThumbnailInfo } from "../../models/product";
import ItemListBody from "./ItemList/ItemListBody";
import ItemListHeader from "./ItemList/ItemListHeader";

interface ItemListProps {
  title: string;
  moreUrl: string;
  products: ProductThumbnailInfo[];
  maxItemCount: number;
  showBidderCount?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ title, moreUrl, products, maxItemCount, showBidderCount }) => {
  return (
    <>
      <ItemListHeader title={title} moreUrl={moreUrl} />
      <ItemListBody products={products} maxItemCount={maxItemCount} showBidderCount={showBidderCount} />
    </>
  );
};

export default ItemList;
