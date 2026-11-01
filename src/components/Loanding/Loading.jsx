import styles from "./Loading.module.css";
import logo from "../../assets/RenderTextilpro.png";

export function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className={styles.loading}>
      <div className={styles.conteudo}>
        <img src={logo} alt="Logo TextilPro" className={styles.logo} />

        <p className={styles.mensagem}>{mensagem}</p>

        <div className={styles.barra}>
          <div className={styles.progresso}></div>
        </div>
      </div>
    </div>
  );
}
