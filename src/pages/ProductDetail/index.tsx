import HigherLayoutComponent from "../../components/common/CustomLayout";
import ProductDetailTag from "../../components/productdetail/ProductDetailLayout";

const productDetail = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        textAlign: "center",
        paddingBottom: "100px",
      }}
    >
      <ProductDetailTag />
    </div>
  );
};

const ProductDetailPage = HigherLayoutComponent(productDetail);

export default ProductDetailPage;
