import "./Viewer.css";

import getEmotion from "../util/get-emotion";
import { EmotionItemList } from "../util/constants";

const Viewer = ({ emotionId, content, title }) => {
  const emotionItem = EmotionItemList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="Viewer">
      <div className="img_section">
        <h3>오늘의 감정</h3>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotion(emotionId)} alt="이미지 불러오는 중..." />
          <div>{emotionItem.emotionName}</div>
        </div>
      </div>
      <div className="content_section">
        <h3>오늘의 일기</h3>
        <h4>{"<" + title + ">"}</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
