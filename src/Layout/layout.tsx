import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import "../css/header.css";
import "../css/global.css";

export function AppLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}
