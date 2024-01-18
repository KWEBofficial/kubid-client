import React, { useState } from "react";
import { Input, Tag } from "antd";

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

const Tags: React.FC<Props> = ({ tags, addTag, deleteTag }) => {
  const [inputValue, setInputValue] = useState("");

  const _addTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      addTag(inputValue);
      setInputValue(() => "");
      //해시태그 입력 시, 입력을 하고 setInputValue("") 가 UI에 반영되지 않음.
      //다른 방법을 시도해봐도 짜잘한 버그 발생.(해결필요)
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="#태그를 입력해 주세요.(최대3개)"
        size="middle"
        style={{ width: 300 }}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={_addTag}
      />

      <div style={{ marginBottom: 80 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ display: "inline-block" }}>
            <Tag onClose={() => deleteTag(tag)} closable>
              {tag}
            </Tag>
          </span>
        ))}
      </div>
    </>
  );
};

export default Tags;
