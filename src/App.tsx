import Workspace from "./components/Workspace/Workspace";

import classes from "./App.module.css";
import MyCalendar from "./components/Workspace/Schedule/MyCalendar";

function App() {
  return (
    <div>
      <MyCalendar />
      <Workspace />
    </div>
  );
}

export default App;
