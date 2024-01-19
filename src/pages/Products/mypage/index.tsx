import { useSearchParams } from "react-router-dom";
import HigherLayoutComponent from "../../../components/common/CustomLayout";
import { useFecth } from "../../../hooks/useFetch";
import { ProductTempDTO } from "../../../types/product/dto";
import QueryString from "qs";
import { DepartmentResDTO } from "../../../models/department";
import { ProductThumbnailInfo } from "../../../models/product";
import ItemList from "../../../components/common/ItemList";

interface Props {
  type: "buy" | "sell";
}

const MyPageProducts: React.FC<Props> = ({ type }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const url = `/users/current-user/product/${type}`;
  const queryString = QueryString.stringify({ page, pageSize });
  const { data, isLoading, isError } = useFecth<ProductTempDTO[]>(`${url}?${queryString}`);

  const departmentUrl = "/department/departments";
  const { data: departments, isLoading: departmentLoading } = useFecth<DepartmentResDTO[]>(departmentUrl);

  if (!data || isLoading || !departments || departmentLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  const products: ProductThumbnailInfo[] = data.map((item) => ({
    id: item.id,
    productName: item.productName,
    departmentName: departments.find((department) => department.id === item.department_id)?.departmentName || "",
    currentHighestPrice: item.currentHighestPrice,
    lowerBound: item.lowerBound,
    upperBound: item.upperBound,
    imageUrl: item.image.url,
  }));

  return (
    <div>
      <ItemList
        title={`${type === "buy" ? "내가 사고있는" : "내가 팔고있는"} 상품들을 모아봤어요!`}
        maxItemCount={pageSize}
        products={products}
      />
    </div>
  );
};

const MyPageProductsPage = HigherLayoutComponent(MyPageProducts);

export default MyPageProductsPage;
