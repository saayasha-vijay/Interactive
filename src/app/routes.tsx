import { createBrowserRouter, Outlet } from "react-router";
import LandingPage from "./pages/landing";
import CitizenDashboard from "./pages/citizen/dashboard";
import OperatorDashboard from "./pages/operator/dashboard";
import SupervisorDashboard from "./pages/supervisor/dashboard";
import DispatchDashboard from "./pages/dispatch/dashboard";
import NotFound from "./pages/not-found";

import MyReports from "./pages/citizen/MyReports";
import LiveTracking from "./pages/citizen/LiveTracking";
import SafetySettings from "./pages/citizen/SafetySettings";
import EmergencyContacts from "./pages/citizen/EmergencyContacts";
import AppPreferences from "./pages/citizen/AppPreferences";

// Layout component for nested routes
function Layout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/citizen",
    Component: Layout,
    children: [
      { path: "dashboard", Component: CitizenDashboard },
      { path: "reports", Component: MyReports },
      { path: "live-tracking", Component: LiveTracking },
      { path: "safety-settings", Component: SafetySettings },
      { path: "emergency-contacts", Component: EmergencyContacts },
      { path: "preferences", Component: AppPreferences },
    ],
  },
  {
    path: "/operator",
    Component: Layout,
    children: [
      { path: "dashboard", Component: OperatorDashboard },
    ],
  },
  {
    path: "/supervisor",
    Component: Layout,
    children: [
      { path: "dashboard", Component: SupervisorDashboard },
    ],
  },
  {
    path: "/dispatch",
    Component: Layout,
    children: [
      { path: "dashboard", Component: DispatchDashboard },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
