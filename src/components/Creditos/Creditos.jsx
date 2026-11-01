import { useEffect } from "react";

import { createPortal } from "react-dom";

import { X, CodeXml } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import styles from "./Creditos.module.css";

const desenvolvedores = [
  {
    id: 1,
    nome: "Paulo Cesar",
    funcao: "Tech Lead",
    github: "https://github.com/paulocesargit",
    linkedin: "https://www.linkedin.com/in/paulocesar22",
  },
  {
    id: 2,
    nome: "Luiz Felipe",
    funcao: "Desenvolvedor Back-end",
    github: "",
    linkedin: "",
  },
  {
    id: 3,
    nome: "Pedro Lucas",
    funcao: "Desenvolvedor Back-end",
    github: "https://github.com/pedrolucasveiga98-arch",
    linkedin: "https://www.linkedin.com/in/pedro-veiga-597785375/",
  },
  {
    id: 4,
    nome: "Iury Santana",
    funcao: "DBA",
    github: "",
    linkedin: "",
  },
  {
    id: 5,
    nome: "Rafael pinheiro",
    funcao: "DBA",
    github: "",
    linkedin: "",
  },
];

export function Creditos({ aberto, fechar }) {
  useEffect(() => {
    if (!aberto) return;

    function fecharComEsc(event) {
      if (event.key === "Escape") {
        fechar();
      }
    }

    document.addEventListener("keydown", fecharComEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.body.style.overflow = "";
    };
  }, [aberto, fechar]);

  if (!aberto) return null;

  return createPortal(
    <div className={styles.fundo} onClick={fechar}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-creditos"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.fechar}
          onClick={fechar}
          aria-label="Fechar créditos"
        >
          <X size={22} />
        </button>

        <div className={styles.cabecalho}>
          <div className={styles.icone}>
            <CodeXml size={28} />
          </div>

          <h2 id="titulo-creditos">Equipe TextilPro</h2>

          <p>Conheça as pessoas por trás do desenvolvimento do sistema.</p>
        </div>

        <div className={styles.lista}>
          {desenvolvedores
            .filter((desenvolvedor) => desenvolvedor.nome.trim() !== "")
            .map((desenvolvedor) => (
              <article key={desenvolvedor.id} className={styles.card}>
                <div className={styles.informacoes}>
                  <h3>{desenvolvedor.nome}</h3>
                  <p>{desenvolvedor.funcao}</p>
                </div>

                <div className={styles.links}>
                  {desenvolvedor.github && (
                    <a
                      href={desenvolvedor.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub de ${desenvolvedor.nome}`}
                      title="GitHub"
                    >
                      <FaGithub size={19} />
                    </a>
                  )}

                  {desenvolvedor.linkedin && (
                    <a
                      href={desenvolvedor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${desenvolvedor.nome}`}
                      title="LinkedIn"
                    >
                      <FaLinkedin size={19} />
                    </a>
                  )}
                </div>
              </article>
            ))}
        </div>

        <footer className={styles.rodape}>
          <span>TextilPro</span>
          <span>© 2026 · Equipe de desenvolvimento</span>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
