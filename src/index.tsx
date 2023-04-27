import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UIContextProvider } from "./contexts/UIContext";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./components/Schedule/Schedule/styles/global-style";
import { TeamContextProvider } from "./contexts/TeamContext";
import { UserInfoContextProvider } from "./contexts/UserInfoContext";
import { WorkspaceContextProvider } from "./contexts/WorkspaceContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserInfoContextProvider>
    <WorkspaceContextProvider>
      <UIContextProvider>
        <TeamContextProvider>
          <App />
        </TeamContextProvider>
      </UIContextProvider>
    </WorkspaceContextProvider>
  </UserInfoContextProvider>
);
