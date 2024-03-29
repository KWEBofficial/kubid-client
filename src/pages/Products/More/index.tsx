/** @jsxImportSource @emotion/react */
import QueryString from "qs";
import { useSearchParams } from "react-router-dom";
import { useFecth } from "../../../hooks/useFetch";
import { ProductDTO } from "../../../types/product/dto";
import HigherLayoutComponent from "../../../components/common/CustomLayout";
import ItemList from "../../../components/common/ItemList";
import { ProductThumbnailInfo } from "../../../models/product";
import { Pagination } from "antd";
import { css } from "@emotion/react";
import { DepartmentResDTO } from "../../../models/department";

const MoreProduct: React.FC = () => {
  const [params] = useSearchParams();
  const sort = params.get("sort") as "recent" | "popular";
  const departmentId = params.get("departmentId");
  const page = Number(params.get("page")) || 1;
  const pageSize = Number(params.get("pageSize")) || 12;

  const url = "/products";
  const query = QueryString.stringify({ sort, departmentId, page, pageSize });
  const { data, isLoading, isError } = useFecth<ProductDTO[]>(`${url}?${query}`);

  const countUrl = "/products/count";
  const countQuery = QueryString.stringify({ sort, departmentId });
  const {
    data: count,
    isLoading: countLoading,
    isError: countError,
  } = useFecth<{ count: number }>(`${countUrl}?${countQuery}`);

  const departmentUrl = "/department/departments";
  const { data: departments, isLoading: departmentLoading } = useFecth<DepartmentResDTO[]>(departmentUrl);

  if (!data || !count || isLoading || countLoading || !departments || departmentLoading) return <div>로딩 중...</div>;
  if (isError || countError) return <div>에러 발생!</div>;

  const products: ProductThumbnailInfo[] = data.map((item) => ({
    id: item.id,
    productName: item.productName,
    departmentName: departments.find((department) => department.id === item.departmentId)?.departmentName || "",
    currentHighestPrice: item.currentHighestPrice,
    lowerBound: item.lowerBound,
    upperBound: item.upperBound,
    imageUrl: item.image.url,
  }));

  const title = {
    recent: "최근에 올라온",
    popular: "지금 핫한 🔥",
  };

  const userDepartment = departments.find((department) => department.id === Number(departmentId))?.departmentName;

  return (
    <div>
      <ItemList
        title={`${userDepartment ? userDepartment + "에서 " : ""}${title[sort]} 글들을 모아봤어요!`}
        maxItemCount={pageSize}
        products={products}
      />
      <div css={PaginationWrapper}>
        <Pagination
          css={PaginationStyle}
          total={count.count}
          current={page}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            const query = QueryString.stringify({ sort, departmentId, page, pageSize });
            window.location.href = `/products/more?${query}`;
          }}
        />
      </div>
    </div>
  );
};

const MoreProductPage = HigherLayoutComponent(MoreProduct);

export default MoreProductPage;

const PaginationWrapper = css`
  display: flex;
  justify-content: center;

  margin-bottom: 40px;
`;

const PaginationStyle = css`
  text-align: center;
`;
