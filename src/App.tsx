import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from "./Main";
import RootNavigator from "./RootNavigator";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RootNavigator />} />
          <Route path="/:id/*" element={<Main />} />
        </Routes>
        {/* Chatting 라우팅은 일단 나중에 생각하기 */}
        {/* <Chatting /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
