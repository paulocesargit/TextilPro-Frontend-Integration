import { useNavigate } from "react-router";
import styles from "./NotFound.module.css";

export function NotFound() {
  const navigate = useNavigate();

  function voltarInicio() {
    navigate("/dashboard");
  }

  return (
    <div className={styles.notFound}>
      <h1>404</h1>

      <h2>Página não encontrada</h2>

      <p>A página que você está procurando não existe ou foi removida.</p>

      <button onClick={voltarInicio}>Voltar ao início</button>
    </div>
  );
}
