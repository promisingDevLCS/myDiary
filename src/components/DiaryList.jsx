import "./DiaryList.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "./Button";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  const getSortedDiary = () => {
    // toSorted(): 콜백 함수에 정의된 대로 만든 결과 리스트를 반환 (원본은 건들지 x)
    return data.toSorted((a, b) =>
      sortType === "latest"
        ? b.createdDate - a.createdDate
        : a.createdDate - b.createdDate
    );
  };

  return (
    <div className="DiaryList">
      <div className="menubar">
        <select onChange={onChangeSortType} name="sortDiary" id="sortDiary">
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 작성하기"}
          type={"POSITIVE"}
        ></Button>
      </div>
      <div className="list_wrapper">
        {getSortedDiary().map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
