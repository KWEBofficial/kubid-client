/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import { getDeptPopularProducts, getPopularProducts, getRecentProducts } from "../api/product";
import HigherLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/common/ItemList";
import SearchSection from "../components/common/SearchSection";
import { ProductThumbnailInfo } from "../models/product";
import { useEffect, useRef, useState } from "react";
import { message, Flex } from "antd";
import { COMMON_MESSAGE } from "../contants/message";
import { getResponsiveValueByWindowWidth, sm_lower_bound, xl_lower_bound } from "../styles/responsive";
import { DEPARTMENTS } from "../data/department";
import { getCurrentUser } from "../api/user";
import { DepartmentResDTO } from "../models/department";
import { getDepartments } from "../api/department";
import { useNavigate } from "react-router";
import { PlusOutlined } from "@ant-design/icons";

const Main = () => {
  const [departments, setDepartments] = useState<DepartmentResDTO[]>(dummyDepartments);

  const [recentProducts, setRecentProducts] = useState<ProductThumbnailInfo[]>(dummyProducts);
  const [popularProducts, setPopularProducts] = useState<ProductThumbnailInfo[]>(dummyProducts);
  const [deptPopularProducts, setDeptPopularProducts] = useState<ProductThumbnailInfo[]>(dummyProducts);
  const [userDepartmentId, setUserDepartmentId] = useState<number>();
  const [isSignedIn, SetIsSignedIn] = useState<boolean>(false);
  const isWorthFetchingNextPageDeptPopularProducts = useRef<boolean>(true);
  const fetchNextPageDeptPopularProductsCount = useRef<number>(0);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [maxItemCount, setMaxItemCount] = useState<number>(0);
  const navigate = useNavigate();
  const handleFloatButton = () => {
    navigate("/products");
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
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
    const fetchCurrentUserDepartmentId = async () => {
      try {
        const { departmentId } = await getCurrentUser();
        SetIsSignedIn(true);
        return departmentId;
      } catch (error) {
        SetIsSignedIn(false);

        const [messageApi] = message.useMessage();
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

    fetchCurrentUserDepartmentId().then((departmentId) => {
      setUserDepartmentId(departmentId);
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMaxItemCount(
      getResponsiveValueByWindowWidth(windowWidth, {
        xl: 4,
        md: 3,
        sm: 2,
        xs: 1,
      }),
    );
  }, [windowWidth]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const rawProducts = await getRecentProducts();
        const products: ProductThumbnailInfo[] = rawProducts.map((rawProduct: any) => {
          const { id, productName, departmentId, currentHighestPrice, upperBound, lowerBound, image } = rawProduct;
          const product: ProductThumbnailInfo = {
            id,
            productName,
            departmentName: DEPARTMENTS[departmentId].label,
            lowerBound,
            currentHighestPrice,
            upperBound,
            imageUrl: image.url,
          };
          return product;
        });
        if (products) {
          setRecentProducts(() => products);
        }
      } catch (error) {
        const [messageApi] = message.useMessage();
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

    const fetchPopularProducts = async () => {
      try {
        const rawProducts = await getPopularProducts();
        const products: ProductThumbnailInfo[] = rawProducts.map((rawProduct: any) => {
          const { id, productName, departmentId, currentHighestPrice, upperBound, lowerBound, bidderCount, image } =
            rawProduct;
          const product: ProductThumbnailInfo = {
            id,
            productName,
            departmentName: DEPARTMENTS[departmentId].label,
            lowerBound,
            currentHighestPrice,
            upperBound,
            bidderCount,
            imageUrl: image.url,
          };
          return product;
        });
        if (products) {
          setPopularProducts(() => products);
        }
      } catch (error) {
        const [messageApi] = message.useMessage();
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

    fetchRecentProducts();
    fetchPopularProducts();
  }, []);

  const fetchDeptPopularProducts = async (departmentId: number, page: number = 1) => {
    try {
      const rawProducts = await getDeptPopularProducts(departmentId, page);
      const products: ProductThumbnailInfo[] = rawProducts.map((rawProduct: any) => {
        const {
          id,
          productName,
          departmentId,
          currentHighestPrice,
          upperBound,
          lowerBound,
          departmentBidderCount: bidderCount,
          image,
        } = rawProduct;
        const product: ProductThumbnailInfo = {
          id,
          productName,
          departmentName: DEPARTMENTS[departmentId].label,
          lowerBound,
          currentHighestPrice,
          upperBound,
          bidderCount,
          imageUrl: image.url,
        };
        return product;
      });
      return products;
    } catch (error) {
      const [messageApi] = message.useMessage();
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

  useEffect(() => {
    userDepartmentId &&
      fetchDeptPopularProducts(userDepartmentId).then((products) => {
        if (products) {
          setDeptPopularProducts(() => products);
        }
      });
  }, [userDepartmentId]);

  useEffect(() => {
    const deptPopularProductsWithoutOverlap = deptPopularProducts.filter((product) => {
      for (let i = 0; i < popularProducts.length; i++) {
        if (popularProducts[i].id === product.id) {
          return false;
        }
      }
      return true;
    });
    if (JSON.stringify(deptPopularProducts) !== JSON.stringify(deptPopularProductsWithoutOverlap)) {
      setDeptPopularProducts(() => deptPopularProductsWithoutOverlap);
      if (deptPopularProductsWithoutOverlap.length < 4) {
        userDepartmentId &&
          fetchDeptPopularProducts(userDepartmentId, fetchNextPageDeptPopularProductsCount.current + 2).then(
            (products) => {
              fetchNextPageDeptPopularProductsCount.current += 1;
              if (isWorthFetchingNextPageDeptPopularProducts.current && products && products.length > 0) {
                setDeptPopularProducts((prev) => [...prev, ...products]);
              } else {
                isWorthFetchingNextPageDeptPopularProducts.current = false;
              }
            },
          );
      }
    }
  }, [deptPopularProducts, popularProducts, userDepartmentId]);

  return (
    <Flex vertical css={SpaceStyle}>
      <SearchSection />
      <ItemList
        title="지금 핫한 🔥"
        products={popularProducts}
        maxItemCount={maxItemCount}
        moreUrl=""
        showMore
        showBidderCount
      />
      <ItemList title="최근에 올라온" products={recentProducts} maxItemCount={maxItemCount} moreUrl="" showMore />
      {isSignedIn ? (
        <ItemList
          title={`${
            userDepartmentId && departments.length > 0 ? departments[userDepartmentId - 1].departmentName : ""
          }에서 많이 찾는`}
          products={deptPopularProducts}
          maxItemCount={maxItemCount}
          moreUrl=""
          showMore
          showBidderCount
        />
      ) : (
        <></>
      )}
      <FloatButton
      icon={<PlusOutlined />}
      type="primary"
      tooltip={<div>상품 등록하기</div>}
      onClick={handleFloatButton}
    />
    </Flex>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;

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

const dummyProducts: ProductThumbnailInfo[] = [];
const dummyDepartments: DepartmentResDTO[] = [];
