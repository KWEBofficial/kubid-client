// DualProgress.tsx
import React from "react";
import { Progress } from "antd";
import { FlagTwoTone } from "@ant-design/icons";

interface DualProgressProps {
  percent1: number;
  percent2: number;
}

const DualProgress: React.FC<DualProgressProps> = ({ percent1, percent2 }) => {
  return (
    <div style={{ position: "relative" }}>
      <Progress
        percent={percent1}
        size={["", 20]}
        status="normal"
        strokeColor="#BA81BB"
        trailColor="transparent"
        showInfo={false}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}
      />
      <Progress
        percent={percent2}
        size={["", 20]}
        status="exception"
        strokeColor="#1D88D6"
        trailColor="#D9D9D9"
        showInfo={false}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}
      />
      <FlagTwoTone twoToneColor="#eb2f96" rotate={15} style={{ position: "absolute", right: 2, top: 5, zIndex: 2 }} />
    </div>
  );
};

export default DualProgress;
