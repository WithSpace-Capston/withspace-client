import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { UIContextProvider } from "./contexts/UIContext";
import { TeamContextProvider } from "./contexts/TeamContext";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./components/Schedule/styles/global-style";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UIContextProvider>
    <TeamContextProvider>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </TeamContextProvider>
  </UIContextProvider>
);
