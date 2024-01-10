import React from "react";
import { Select } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const DepartmentDropdown: React.FC = () => (
  <Select
    defaultValue="학과를 선택해주세요"
    style={{ width: "auto" }}
    onChange={handleChange}
    size="large"
    options={[
      { value: "", label: "학과를 선택해주세요", disabled: true },
      { value: "경영학과", label: "경영학과" },
      { value: "국어국문학과", label: "국어국문학과" },
      { value: "철학과", label: "철학과" },
      { value: "한국사학과", label: "한국사학과" },
      { value: "사학과", label: "사학과" },
      { value: "사회학과", label: "사회학과" },
      { value: "한문학과", label: "한문학과" },
      { value: "영어영문학과", label: "영어영문학과" },
      { value: "독어독문학과", label: "독어독문학과" },
      { value: "불어불문학과", label: "불어불문학과" },
      { value: "중어중문학과", label: "중어중문학과" },
      { value: "노어노문학과", label: "노어노문학과" },
      { value: "일어일문학과", label: "일어일문학과" },
      { value: "서어서문학과", label: "서어서문학과" },
      { value: "언어학과", label: "언어학과" },
      { value: "생명과학부", label: "생명과학부" },
      { value: "생명공학부", label: "생명공학부" },
      { value: "식품공학과", label: "식품공학과" },
      { value: "환경생태공학부", label: "환경생태공학부" },
      { value: "식품자원경제학과", label: "식품자원경제학과" },
      { value: "정치외교학과", label: "정치외교학과" },
      { value: "경제학과", label: "경제학과" },
      { value: "통계학과", label: "통계학과" },
      { value: "행정학과", label: "행정학과" },
      { value: "수학과", label: "수학과" },
      { value: "물리학과", label: "물리학과" },
      { value: "화학과", label: "화학과" },
      { value: "지구환경과학과", label: "지구환경과학과" },
      { value: "화공생명공학과", label: "화공생명공학과" },
      { value: "신소재공학부", label: "신소재공학부" },
      { value: "건축사회환경공학부", label: "건축사회환경공학부" },
      { value: "건축학과", label: "건축학과" },
      { value: "기계공학부", label: "기계공학부" },
      { value: "산업경영공학부", label: "산업경영공학부" },
      { value: "전기전자공학부", label: "전기전자공학부" },
      { value: "융합에너지공학과", label: "융합에너지공학과" },
      { value: "반도체공학과", label: "반도체공학과" },
      { value: "차세대통신학과", label: "차세대통신학과" },
      { value: "의학과", label: "의학과" },
      { value: "교육학과", label: "교육학과" },
      { value: "국어교육과", label: "국어교육과" },
      { value: "영어교육과", label: "영어교육과" },
      { value: "지리교육과", label: "지리교육과" },
      { value: "역사교육과", label: "역사교육과" },
      { value: "가정교육과", label: "가정교육과" },
      { value: "수학교육과", label: "수학교육과" },
      { value: "체육교육과", label: "체육교육과" },
      { value: "간호학과", label: "간호학과" },
      { value: "컴퓨터학과", label: "컴퓨터학과" },
      { value: "데이터과학과", label: "데이터과학과" },
      { value: "디자인조형학부", label: "디자인조형학부" },
      { value: "국제학부", label: "국제학부" },
      { value: "글로벌한국융합학부", label: "글로벌한국융합학부" },
      { value: "미디어학부", label: "미디어학부" },
      { value: "바이오의공학부", label: "바이오의공학부" },
      { value: "바이오시스템의과학부", label: "바이오시스템의과학부" },
      { value: "보건환경융합과학부", label: "보건환경융합과학부" },
      { value: "보건정책관리학부", label: "보건정책관리학부" },
      { value: "자유전공학부", label: "자유전공학부" },
      { value: "스마트보안학부", label: "스마트보안학부" },
      { value: "사이버국방학과", label: "사이버국방학과" },
      { value: "심리학부", label: "심리학부" },
      { value: "스마트모빌리티학부", label: "스마트모빌리티학부" },
    ]}
  />
);

export default DepartmentDropdown;
