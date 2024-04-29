import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    alert("일기가 성공적으로 저장되었습니다!");
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav("/")} text={"< 뒤로 가기"} />}
      ></Header>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
