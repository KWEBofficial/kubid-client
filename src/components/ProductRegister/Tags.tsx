import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { Input, Tag, theme } from "antd";

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

const Tags: React.FC<Props> = ({ tags, addTag, deleteTag }) => {
  const { token } = theme.useToken();
  const [inputValue, setInputValue] = useState("");

  const _addTag = () => {
    if (inputValue) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === "appear" || e.type === "enter") {
              (e.target as any).style = "display: inline-block";
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tags.map((tag) => (
            <span key={tag} style={{ display: "inline-block" }}>
              <Tag onClose={() => deleteTag(tag)} closable />
            </span>
          ))}
        </TweenOneGroup>
      </div>
      <Input
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={_addTag}
      />
      <Tag
        onClick={_addTag}
        style={{
          background: token.colorBgContainer,
          borderStyle: "dashed",
        }}
      >
        <PlusOutlined /> 태그를 추가하세요
      </Tag>
    </>
  );
};

export default Tags;
