import React, { useState } from "react";

import { Input, Tag } from "antd";
import { TagDTO } from "../../types/tag/dto";

interface Props {
  tags: TagDTO[];
  addTag: (tag: string) => void;
  deleteTag: (tag: number) => void;
}

const Tags: React.FC<Props> = ({ tags, addTag, deleteTag }) => {
  const [inputValue, setInputValue] = useState("");

  const _addTag = () => {
    if (inputValue && !tags.find((tag) => tag.tag === inputValue)) {
      addTag(inputValue);
      setInputValue(() => "");
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
        value={inputValue}
      />

      <div style={{ marginBottom: 80 }}>
        {tags.map((tag) => (
          <span key={tag.id} style={{ display: "inline-block" }}>
            <Tag onClose={() => deleteTag(tag.id)} closable>
              {tag.tag}
            </Tag>
          </span>
        ))}
      </div>
    </>
  );
};

export default Tags;
