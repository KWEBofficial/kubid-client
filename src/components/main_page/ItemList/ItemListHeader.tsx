/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface ItemListHeaderProps {
  title: string;
  moreUrl: string;
}

const ItemListHeader: React.FC<ItemListHeaderProps> = ({ title, moreUrl }) => {
  return (
    <div css={DivStyle}>
      <h2 css={HeaderStyle}>{title}</h2>
      <p css={moreLinkStyle}>
        <Link to={moreUrl}>더보기</Link>
      </p>
    </div>
  );
};

export default ItemListHeader;

const DivStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderStyle = css`
  margin: 0;
`;

const moreLinkStyle = css`
  margin: 0;
`;
