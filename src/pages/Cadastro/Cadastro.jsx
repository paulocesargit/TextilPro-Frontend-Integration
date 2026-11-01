import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Cadastro.module.css";
import { fazerCadastro } from "../../services/authService.js";
import { LoadingF } from "../../components/LoandingFormulario/LoadingF";
import logo from "../../assets/RenderTextilpro.png";
import { toast } from "sonner";

export function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregarLogin, setcarregarLogin] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [genero, setGenero] = useState("");

  const navigate = useNavigate();

  async function cadastrar(event) {
    event.preventDefault();

    if (!usuario || !senha || !confirmarSenha || !genero) {
      toast.warning("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!aceitouTermos) {
      toast.warning(
        "Você precisa aceitar os termos e a política de privacidade.",
      );
      return;
    }

    try {
      setcarregarLogin(true);

      await fazerCadastro({
        usuario,
        senha,
        genero,
      });

      toast.success("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (erro) {
      setcarregarLogin(false);

      toast.error(
        erro.response?.data?.message || "Não foi possível realizar o cadastro.",
      );
    }
  }

  function irParaLogin() {
    setcarregarLogin(true);

    setTimeout(() => {
      navigate("/Login");
    }, 2000);
  }

  return (
    <div className={styles.cadastro}>
      <form className={styles.formulario} onSubmit={cadastrar}>
        <img src={logo} alt="TextilPro Têxtil" />

        {carregarLogin ? (
          <div className={styles.carregamentoLogin}>
            <LoadingF mensagem="Voltando para o login..." />
          </div>
        ) : (
          <>
            <p>Crie sua conta</p>

            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(event) =>
                setUsuario(event.target.value.replace(/[^a-zA-ZÀ-ÿ]/g, ""))
              }
            />

            <label htmlFor="senha">Senha</label>
            <div className={styles.campoSenha}>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Crie uma senha"
                value={senha}
                maxLength={5}
                onChange={(event) => setSenha(event.target.value)}
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? "🙈" : "👁"}
              </button>
            </div>

            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <div className={styles.campoSenha}>
              <input
                id="confirmarSenha"
                type={mostrarConfirmarSenha ? "text" : "password"}
                placeholder="Digite a senha novamente"
                value={confirmarSenha}
                maxLength={5}
                onChange={(event) => setConfirmarSenha(event.target.value)}
              />

              <button
                type="button"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                aria-label={
                  mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {mostrarConfirmarSenha ? "🙈" : "👁"}
              </button>
            </div>
            <div className={styles.campogenero}>
              <label htmlFor="genero">Gênero</label>
              <div className={styles.selectSet}>
                <select
                  id="genero"
                  name="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <div className={styles.termos}>
                <input
                  type="checkbox"
                  id="aceitouTermos"
                  checked={aceitouTermos}
                  onChange={(event) => setAceitouTermos(event.target.checked)}
                />

                <label htmlFor="aceitouTermos">
                  Li e aceito os{" "}
                  <button
                    type="button"
                    className={styles.linkTermos}
                    onClick={() => navigate("/privacidade")}
                  >
                    termos de uso e a política de privacidade
                  </button>
                  do TextilPro.
                </label>
              </div>
            </div>
            <button type="submit">Criar conta</button>

            <div className={styles.voltarLogin}>
              <span>Já tem uma conta?</span>
              <button type="button" onClick={irParaLogin}>
                Entrar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
