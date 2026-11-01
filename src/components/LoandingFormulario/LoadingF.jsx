import styles from "./LoandingF.module.css";

export function LoadingF({ mensagem }) {
  return (
    <div>
      <div className={styles.spinner}></div>
      <p>{mensagem}</p>
    </div>
  );
}
