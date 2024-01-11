import { Button, Progress } from "antd";
import { colors } from "../../../../styles/colors";

const ItemButton = () => {
  return (
    <Button style={{ width: "265px", height: "290px", padding: 0, position: "relative" }}>
      <div style={{ height: "50%", margin: 0 }}>
        {/* Image Section */}
        <img src="../../../public/cat.png" alt="Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ height: "50%", textAlign: "left", paddingLeft: 10, paddingRight: 10 }}>
        {/* Text Section */}
        <h3 style={{ color: colors.black, fontWeight: 700, fontSize: "16px", marginBottom: 0 }}>[급처] 버찌 팝니다</h3>
        <p style={{ color: colors.black, textAlign: "right", fontSize: "12px", marginBottom: 0 }}>컴퓨터학과</p>
        <p style={{ margin: 0 }}>
          <span style={{ color: colors.black, fontWeight: 700, fontSize: "32px", marginRight: "5px" }}>7000</span>
          <span style={{ color: colors.primary, fontWeight: 700, fontSize: "24px" }}>10000</span>
        </p>
      </div>
      <div style={{ height: "5%", margin: 0, position: "absolute", bottom: 8, left: -5 }}>
        {/* Progress Bar Section */}
        <Progress percent={70} size={[265, 20]} status="normal" showInfo={false} />
      </div>
    </Button>
  );
};

export default ItemButton;
