import { createBrowserRouter, Outlet } from "react-router";
import LandingPage from "./pages/landing";
import CitizenDashboard from "./pages/citizen/dashboard";
import OperatorDashboard from "./pages/operator/dashboard";
import SupervisorDashboard from "./pages/supervisor/dashboard";
import DispatchDashboard from "./pages/dispatch/dashboard";
import NotFound from "./pages/not-found";

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
