import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Main from "./Main";
import Login from "./components/Login/Login";
import CreateAccount from "./components/Login/CreateAccount";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/space/:pageId" element={<Main space="space" />} />
          <Route
            path="/schedule/:scheduleId"
            element={<Main space="schedule" />}
          />
        </Routes>
        {/* Chatting 라우팅은 일단 나중에 생각하기 */}
        {/* <Chatting /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
