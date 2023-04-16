import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UIContextProvider } from "./contexts/UIContext";
import { TeamContextProvider } from "./contexts/TeamContext";
import { UserInfoContextProvider } from "./contexts/UserInfoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserInfoContextProvider>
    <UIContextProvider>
      <TeamContextProvider>
        <App />
      </TeamContextProvider>
    </UIContextProvider>
  </UserInfoContextProvider>
);
