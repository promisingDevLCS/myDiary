import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext, useState } from "react";

// firebase 연동
// import { auth } from "./FirebaseInit";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
};

const testData = [
  {
    id: 1,
    createdDate: new Date("2024-4-10").getTime(),
    emotionId: 1,
    title: "1번 일기 제목",
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2024-4-9").getTime(),
    emotionId: 2,
    title: "2번 일기 제목",
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2024-3-9").getTime(),
    emotionId: 3,
    title: "3번 일기 제목",
    content: "3번 일기 내용",
  },
];

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, testData);
  const idRef = useRef(3);

  // firebase Login test code
  const [userData, setUserData] = useState(null);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        title,
        content,
      },
    });
  };

  // 일기 수정
  const onUpdate = (id, createdDate, emotionId, title, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        title,
        content,
      },
    });
  };

  // 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
