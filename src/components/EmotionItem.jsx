import "./EmotionItem.css";

import getEmotion from "../util/get-emotion";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img
        className="emotion_img"
        src={getEmotion(emotionId)}
        alt="로딩 중..."
      />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
