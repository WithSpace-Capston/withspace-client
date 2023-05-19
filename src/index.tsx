import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UIContextProvider } from "./contexts/UIContext";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/Schedule/Schedule/styles/theme";
import { TeamContextProvider } from "./contexts/TeamContext";
import { WorkspaceContextProvider } from "./contexts/WorkspaceContext";
import { ScheduleContextProvider } from "./contexts/ScheduleContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <WorkspaceContextProvider>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <ScheduleContextProvider>
            <UIContextProvider>
              <TeamContextProvider>
                <App />
              </TeamContextProvider>
            </UIContextProvider>
          </ScheduleContextProvider>
        </RecoilRoot>
      </ThemeProvider>
    </WorkspaceContextProvider>
  </RecoilRoot>
);
