import { Component, Show } from "solid-js";
import { Router, Route, Navigate, useLocation } from "@solidjs/router";
import { profile } from "./store/profile";
import { currentPopup, dismissPopup } from "./store/popupQueue";
import NavBar from "./components/NavBar";
import AchievementPopup from "./components/AchievementPopup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Achievements from "./pages/Achievements";
import Report from "./pages/Report";

const Layout: Component<{ children?: any }> = (props) => {
  const location = useLocation();
  const isOnboarding = () => location.pathname === "/onboarding";

  return (
    <>
      {props.children}
      <Show when={!isOnboarding()}>
        <NavBar />
      </Show>
      <Show when={currentPopup()}>
        {(achievement) => (
          <AchievementPopup
            achievement={achievement()}
            onDismiss={dismissPopup}
          />
        )}
      </Show>
    </>
  );
};

const GuardedRoute: Component<{ component: Component }> = (props) => {
  if (!profile()) {
    return <Navigate href="/onboarding" />;
  }
  return <props.component />;
};

const GuardedOnboarding: Component = () => {
  if (profile()) {
    return <Navigate href="/" />;
  }
  return <Onboarding />;
};

const App: Component = () => {
  return (
    <Router root={Layout}>
      <Route path="/onboarding" component={GuardedOnboarding} />
      <Route path="/" component={() => <GuardedRoute component={Dashboard} />} />
      <Route path="/history" component={() => <GuardedRoute component={History} />} />
      <Route path="/achievements" component={() => <GuardedRoute component={Achievements} />} />
      <Route path="/report" component={() => <GuardedRoute component={Report} />} />
    </Router>
  );
};

export default App;
