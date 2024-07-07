import Router from "./routes/Routes";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import 'highlight.js/styles/default.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "./hooks/useStorage";
import { Authentication, RefeshToken } from "./service/auth";
import { getUserProgress } from "./service/progress";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
const queryClient = new QueryClient();
export const coursesContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        progress: undefined,
      };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    progress: undefined,
  });
  const [user, setUser] = useLocalStorage("user", {});
  useEffect(() => {
    const socket = io("ws://localhost:4000");
    let intervalId: any;
    socket.on("confirmEditPermission", (data) => {
      if (data.email === user.data[0].email) {
        handleRefreshToken();

      }
    });

    const handleProtectedRequest = async () => {
      try {
        const response: any = await Authentication(user.token);
        if (response.status === 1) {
          let res: any = await getUserProgress(user.data[0]._id);
          dispatch({
            type: "PROGRESS",
            payload: {
              ...state,
              progress: res.data,
            },
          });
          handleRefreshToken();
        } else {
          let res: any = await getUserProgress(user.data[0]._id);
          dispatch({
            type: "PROGRESS",
            payload: {
              ...state,
              progress: res.data,
            },
          });
          dispatch({
            type: "LOGIN",
            payload: {
              ...state,
              user: user.data,
            },
          });
        }
      } catch (error) {}
    };

    handleProtectedRequest();
    // intervalId = setInterval(() => {
    //   handleProtectedRequest();
    // }, 40000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleRefreshToken = async () => {
    try {
      const response: any = await RefeshToken(user.refeshToken);
      if (response?.status === 0) {
        setUser({ ...user,data:[response.datanew], token: response.accessToken });
        dispatch({
          type: "LOGIN",
          payload: {
            ...state,
            user: user.data,
          },
        });
      }
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };
  console.log(state);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <coursesContext.Provider value={{ dispatch, state }}>
          <Router />
        </coursesContext.Provider>
      </QueryClientProvider>
      <ToastContainer/>
    </div>
  );
};
export const useCoursesContext = () => useContext(coursesContext);
export default App;
