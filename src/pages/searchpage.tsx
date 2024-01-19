/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Flex, message, Pagination } from "antd";
import SearchSection from "../components/common/SearchSection";
import ItemList from "../components/common/ItemList";
import { sm_lower_bound, xl_lower_bound } from "../styles/responsive";
import { ProductThumbnailInfo } from "../models/product";
import HigherLayoutComponent from "../components/common/CustomLayout";
import { useEffect, useState } from "react";
import { DepartmentResDTO } from "../models/department";
import { getSearchResults, getSearchResultsCount } from "../api/product";
import { COMMON_MESSAGE } from "../contants/message";
import { AxiosError } from "axios";
import { getDepartments } from "../api/department";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<DepartmentResDTO[]>(dummyDepartments);
  const [searchResults, setSearchResults] = useState<ProductThumbnailInfo[]>(dummyProducts);
  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);

  const params = new URLSearchParams(window.location.search);
  const search = params.get("search") || "";
  const page = Number(params.get("page")) > 0 ? Number(params.get("page")) : 1;
  const pageSize = Number(params.get("pageSize")) > 0 ? Number(params.get("pageSize")) : 4;
  const departmentId = Number(params.get("departmentId")) > 0 ? Number(params.get("departmentId")) : undefined;

  const [pageDisplayed, setPageDisplayed] = useState<number>(page);
  useEffect(() => {
    setPageDisplayed(page);
  }, [page]);

  const handlePageChange = (page: number, pageSize: number) => {
    navigate(
      `/products?search=${search}&sort=recent&page=${page}&pageSize=${pageSize}${
        departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""
      }`,
    );
  };

  useEffect(() => {
    const fetchDepartments = async (): Promise<DepartmentResDTO[]> => {
      return await getDepartments();
    };

    fetchDepartments().then((depts) => {
      setDepartments(() => depts);
    });
  }, []);

  useEffect(() => {
    const fetchSearchResults = async (search: string, page: number, pageSize: number, departmentId?: number) => {
      try {
        const rawProducts = await getSearchResults(search, page, pageSize, departmentId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const products: ProductThumbnailInfo[] = rawProducts.map((rawProduct: any) => {
          const { id, productName, departmentId, currentHighestPrice, upperBound, lowerBound, image } = rawProduct;
          const product: ProductThumbnailInfo = {
            id,
            productName,
            departmentName: departments[departmentId - 1].departmentName,
            lowerBound,
            currentHighestPrice,
            upperBound,
            imageUrl: image.url,
          };
          return product;
        });

        if (products) return products;
      } catch (error) {
        if (error instanceof AxiosError) {
          messageApi.open({
            type: "error",
            content: error?.response?.data.message || COMMON_MESSAGE.SERVER_ERROR,
          });
          return;
        } else {
          messageApi.open({
            type: "error",
            content: COMMON_MESSAGE.UNKNOWN_ERROR,
          });
        }
      }
    };

    const fetchSearchResultsCount = async (search: string, departmentId?: number) => {
      try {
        const result = await getSearchResultsCount(search, departmentId);
        return result.count;
      } catch (error) {
        if (error instanceof AxiosError) {
          messageApi.open({
            type: "error",
            content: error?.response?.data.message || COMMON_MESSAGE.SERVER_ERROR,
          });
          return;
        } else {
          messageApi.open({
            type: "error",
            content: COMMON_MESSAGE.UNKNOWN_ERROR,
          });
        }
      }
    };

    fetchSearchResults(search, page, pageSize, departmentId).then((results) => {
      if (results) setSearchResults(() => results);
    });

    fetchSearchResultsCount(search, departmentId).then((result) => {
      setSearchResultsCount(result);
    });
  }, [departmentId, page, pageSize, search, departments, messageApi]);

  return (
    <Flex vertical css={SpaceStyle}>
      <SearchSection />
      <ItemList
        title={`${searchResultsCount}개의 상품을 찾았어요${searchResultsCount === 0 ? " 🥲" : ""}`}
        products={searchResults}
        maxItemCount={pageSize}
      />
      {searchResultsCount > 0 ? (
        <Pagination
          current={pageDisplayed}
          pageSize={pageSize}
          total={searchResultsCount}
          css={PaginationStyle}
          onChange={handlePageChange}
        />
      ) : (
        <></>
      )}
    </Flex>
  );
};

const MainPage = HigherLayoutComponent(Search);

export default MainPage;

const dummyProducts: ProductThumbnailInfo[] = [];
const dummyDepartments: DepartmentResDTO[] = [];

const SpaceStyle = css`
  display: flex;
  width: 1100px !important;

  @media (max-width: ${xl_lower_bound}px) {
    width: 90% !important;
  }

  @media (max-width: ${sm_lower_bound}px) {
    width: 85% !important;
  }
`;

const PaginationStyle = css`
  text-align: center;
`;
