import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

export default function useDiary(id) {
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();
  const [currDiary, setCurrDiary] = useState();

  useEffect(() => {
    const diaryItem = data.find((item) => String(item.id) === String(id));

    if (!diaryItem) {
      alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurrDiary(diaryItem);
  }, [id, data]);

  return currDiary;
}
