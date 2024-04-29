import "./Editor.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { format } from "date-fns"; // 날짜 형식으로 'yyyy-MM-dd' 바꿔주는 라이브러리
import { EmotionItemList } from "../util/constants";

const Editor = ({ onSubmit, initData }) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          name="createdDate"
          value={format(input.createdDate, "yyyy-MM-dd")}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {EmotionItemList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘 하루는 어땠나요?"
          name="content"
          value={input.content}
          onChange={onChangeInput}
          id="textArea_field"
          cols="30"
          rows="10"
        ></textarea>
      </section>
      <section className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            confirm("정말 작성을 취소하시겠습니까?")
              ? nav("/", { replace: true })
              : "";
          }}
        />
        <Button
          text={"저장하기"}
          type={"POSITIVE"}
          onClick={onClickSubmitButton}
        />
      </section>
    </div>
  );
};

export default Editor;
