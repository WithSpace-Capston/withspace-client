import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Main from "./Main";
import Login from "./components/Login/Login";
import CreateAccount from "./components/Login/CreateAccount";
import AddCategory from "./components/Schedule/Schedule/feed/AddCategory";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/space/:id" element={<Main space="space" />} />
          <Route path="/calendar/:id" element={<Main space="calendar" />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/space/:pageId" element={<Main space="space" />} />
          <Route
            path="/schedule/:scheduleId"
            element={<Main space="schedule" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
