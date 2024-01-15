import MyBoxBody from "./MyBox/MyBoxBody";

interface MyBoxListProps {
  nickName: string;
  password: string;
  buyCount: string;
  sellCount: string;
}

const MyBoxList: React.FC<MyBoxListProps> = ({ nickName, password, buyCount, sellCount }) => {
  return (
    <>
      <MyBoxBody nickName={nickName} password={password} buyCount={buyCount} sellCount={sellCount} />
    </>
  );
};

export default MyBoxList;
