import { ProductThumbnailInfo } from "../../models/product";
import ItemListBody from "./ItemList/ItemListBody";
import ItemListHeader from "./ItemList/ItemListHeader";

interface ItemListProps {
  title: string;
  moreUrl?: string;
  moreText?: string;
  products: ProductThumbnailInfo[];
  maxItemCount: number;
  showBidderCount?: boolean;
  showMore?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({
  title,
  moreUrl,
  moreText,
  products,
  maxItemCount,
  showBidderCount,
  showMore,
}) => {
  return (
    <>
      <ItemListHeader title={title} moreUrl={moreUrl} moreText={moreText} showMore={showMore} />
      <ItemListBody products={products} maxItemCount={maxItemCount} showBidderCount={showBidderCount} />
    </>
  );
};

export default ItemList;
