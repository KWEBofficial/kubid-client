/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { colors } from "../../../styles/colors";
import { Typography, Flex } from "antd";

const { Title, Text } = Typography;

interface ItemListHeaderProps {
  title: string;
  moreUrl?: string;
  moreText?: string;
  showMore?: boolean;
}

const ItemListHeader: React.FC<ItemListHeaderProps> = ({ title, moreUrl, moreText, showMore }) => {
  return (
    <Flex justify="space-between" align="flex-end" style={{ marginBottom: "12px" }}>
      <Title level={4} css={HeaderStyle}>
        {title}
      </Title>
      {showMore && (
        <Text css={moreTextStyle}>
          <Link to={moreUrl || ""} css={moreLinkStyle}>
            {moreText ? `${moreText}` : "더보기"}
          </Link>
        </Text>
      )}
    </Flex>
  );
};

export default ItemListHeader;

const HeaderStyle = css`
  margin-bottom: 10px;
`;

const moreTextStyle = css`
  margin: 0;
  margin-bottom: 10px;
  margin-right: 5px;
  font-weight: bold;
  // flex: 0 0 50px;
`;

const moreLinkStyle = css`
  color: ${colors.primary};
`;
