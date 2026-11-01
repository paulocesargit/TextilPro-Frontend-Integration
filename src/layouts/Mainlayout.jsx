import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar/Sidebar.jsx";
import styles from "./MainLayout.module.css";

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.conteudo}>
        <Outlet />
      </main>
    </div>
  );
}
