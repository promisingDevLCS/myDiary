import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext, useState, useEffect } from "react";

// firebase 연동
// import { auth } from "./FirebaseInit";
import getDocument from "./firebase/getDocument";
import setDocument from "./firebase/setDocument";
import updateDocument from "./firebase/updateDocument";
import deleteDocument from "./firebase/deleteDocument";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
  let nextState;

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      // FireStore DB에 데이터 저장
      setDocument(
        action.data.id,
        action.data.createdDate,
        action.data.emotionId,
        action.data.title,
        action.data.content
      );
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      // fireStore DB에 데이터 업데이트
      updateDocument(action.data.id, action.data);
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      // fireStore DB에 데이터 삭제
      deleteDocument(action.id);
      break;
    }
    default:
      return state;
  }

  return nextState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [data, dispatch] = useReducer(reducer, testData);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // 비동기 함수 처리를 위해 useEffect 사용
  useEffect(() => {
    const storedData = [];
    let maxId = 0;
    async function fetchData() {
      const result = await getDocument();
      result.forEach((doc) => {
        // doc.id의 형태는 diary_${id} 이므로, 숫자 id를 얻기 위해 "_"를 기준으로 문자열을 나누었다.
        const diaryId = doc.id.split("_")[1];
        if (Number(diaryId) > maxId) {
          maxId = Number(diaryId);
        }
        storedData.push(doc.data());
      });
      // Id 중복 방지를 위헤 DB에 저장되어 있는 Id 값 중 가장 큰 값에서 +1을 하여 IdRef 설정
      idRef.current = maxId + 1;

      dispatch({
        type: "INIT",
        data: storedData,
      });
    }
    fetchData();
  }, []);

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
      <DiaryStateContext.Provider value={data} id={idRef.current}>
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
