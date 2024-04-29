import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Viewer from "../components/Viewer";
import Button from "../components/Button";
import useDiary from "../hooks/useDiary";
import { format } from "date-fns";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  // 커스텀 훅 사용(중복 코드 제거)
  const currDiaryItem = useDiary(params.id);

  if (!currDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }

  const { createdDate, emotionId, content, title } = currDiaryItem;

  return (
    <div>
      <Header
        title={`${format(createdDate, "yyyy-MM-dd")} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} title={title} />
    </div>
  );
};

export default Diary;
