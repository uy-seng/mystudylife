import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Guest } from "./pages/Guest";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { Schedule } from "./pages/Schedule";
import css from "./App.module.css";
import {
  AiFillDashboard,
  AiFillCalendar,
  AiFillCheckSquare,
  AiFillSnippets,
  AiFillSchedule,
  AiOutlineFileSearch,
} from "react-icons/ai";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Guest} />
          <Route path="/sign-up" component={SignUp} />
          <React.Fragment>
            <div className={css.page}>
              <Sidebar
                menu={[
                  { icon: <AiFillDashboard />, pathname: "dashboard" },
                  { icon: <AiFillCalendar />, pathname: "calendar" },
                  { icon: <AiFillCheckSquare />, pathname: "task" },
                  { icon: <AiFillSnippets />, pathname: "exam" },
                  { icon: <AiFillSchedule />, pathname: "schedule" },
                  { icon: <AiOutlineFileSearch />, pathname: "search" },
                ]}
              />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/schedule" component={Schedule} />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
