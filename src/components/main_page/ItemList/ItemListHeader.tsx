/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { colors } from "../../../styles/colors";
import { Typography, Space } from "antd";

const { Title, Text } = Typography;

interface ItemListHeaderProps {
  title: string;
  moreUrl: string;
}

const ItemListHeader: React.FC<ItemListHeaderProps> = ({ title, moreUrl }) => {
  return (
    <Space css={SpaceStyle}>
      <Title level={2} css={HeaderStyle}>
        {title}
      </Title>
      <Text css={moreTextStyle}>
        <Link to={moreUrl} css={moreLinkStyle}>
          더보기
        </Link>
      </Text>
    </Space>
  );
};

export default ItemListHeader;

const SpaceStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const HeaderStyle = css`
  margin-bottom: 0;
`;

const moreTextStyle = css`
  margin: 0;
  margin-bottom: 60px;
  margin-right: 5px;
  font-weight: bold;
`;

const moreLinkStyle = css`
  color: ${colors.primary};
`;
