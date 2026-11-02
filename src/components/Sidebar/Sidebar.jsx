import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  Users,
  ChartColumn,
  Settings,
  LogOut,
  UsersRound,
} from "lucide-react";
import logo from "../../assets/RenderTextilProC.png";
import { Loading } from "../Loanding/Loading";
import { sairDaConta } from "../../services/authService.js";

import styles from "./Sidebar.module.css";

const menuItems = [
  {
    nome: "Início",
    caminho: "/dashboard",
    icone: LayoutDashboard,
  },
  {
    nome: "Vendas",
    caminho: "/vendas",
    icone: ShoppingCart,
  },
  {
    nome: "Estoque",
    caminho: "/estoque",
    icone: Package,
  },
  {
    nome: "Pedidos",
    caminho: "/pedidos",
    icone: ClipboardList,
  },
  {
    nome: "Configurações",
    caminho: "/configuracoes",
    icone: Settings,
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  async function sair() {
    setCarregando(true);

    try {
      await sairDaConta();
    } catch (erro) {
      console.error("Erro ao encerrar sessão:", erro);
    } finally {
      localStorage.removeItem("usuario");
      localStorage.removeItem("genero");

      navigate("/login");
    }
  }

  if (carregando) {
    return <Loading mensagem="Saindo da sua conta..." />;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Agreste Têxtil" />
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const Icone = item.icone;

          return (
            <NavLink
              key={item.caminho}
              to={item.caminho}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.ativo}` : styles.link
              }
            >
              <Icone size={19} />
              <span>{item.nome}</span>
            </NavLink>
          );
        })}
      </nav>

      <button className={styles.botaoSair} onClick={sair}>
        <LogOut size={19} />
        <span>Sair</span>
      </button>
    </aside>
  );
}
