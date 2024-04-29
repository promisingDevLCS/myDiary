import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const params = useParams();
  const nav = useNavigate();
  // 커스텀 훅 사용(중복 코드 제거)
  const currentDiaryItem = useDiary(params.id);

  const onSubmit_Update = (input) => {
    if (confirm("일기를 수정하시겠습니까?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  const onClick_Delete = () => {
    if (confirm("일기를 삭제하시겠습니까?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <div className="Edit">
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav("/")} text={"< 뒤로 가기"} />}
        rightChild={
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={onClick_Delete}
          />
        }
      />
      <Editor onSubmit={onSubmit_Update} initData={currentDiaryItem} />
    </div>
  );
};

export default Edit;
