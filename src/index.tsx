import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UIContextProvider } from "./contexts/UIContext";
import { RecoilRoot } from "recoil";
import { TeamContextProvider } from "./contexts/TeamContext";
import { WorkspaceContextProvider } from "./contexts/WorkspaceContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <WorkspaceContextProvider>
      <UIContextProvider>
        <TeamContextProvider>
          <App />
        </TeamContextProvider>
      </UIContextProvider>
    </WorkspaceContextProvider>
  </RecoilRoot>
);
