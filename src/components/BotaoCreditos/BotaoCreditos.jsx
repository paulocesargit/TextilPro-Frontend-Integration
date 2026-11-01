import { useState } from "react";
import { CodeXml } from "lucide-react";

import { Creditos } from "../Creditos/Creditos.jsx";
import styles from "./BotaoCreditos.module.css";

export function BotaoCreditos() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.botao}
        onClick={() => setAberto(true)}
        aria-label="Conheça os desenvolvedores"
        title="Conheça os desenvolvedores"
      >
        <CodeXml size={23} />
      </button>

      <Creditos aberto={aberto} fechar={() => setAberto(false)} />
    </>
  );
}
