import "./DiaryItem.css";

import { useNavigate } from "react-router-dom";

import getEmotion from "../util/get-emotion";
import Button from "./Button";

const DiaryItem = ({ id, createdDate, emotionId, title }) => {
  const nav = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        className={`img_section img_section_${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}
      >
        <img src={getEmotion(emotionId)} alt="이미지 불러오는 중..." />
      </div>
      <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
        <div className="createdDate">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{title}</div>
      </div>
      <div className="button_section" onClick={() => nav(`/edit/${id}`)}>
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
