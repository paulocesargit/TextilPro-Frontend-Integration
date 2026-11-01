import { useEffect, useState } from "react";

import {
  Palette,
  Sun,
  Moon,
  RotateCcw,
  Building2,
  UserRound,
  ShieldCheck,
  Info,
  CodeXml,
  Save,
} from "lucide-react";

import { toast } from "sonner";

import { Creditos } from "../../components/Creditos/Creditos.jsx";

import styles from "./Configuracoes.module.css";

export function Configuracoes() {
  const [tema, setTema] = useState(() => {
    const usuarioAtual = localStorage.getItem("usuario");

    return localStorage.getItem(`tema_${usuarioAtual}`) || "claro";
  });

  const [fonte, setFonte] = useState(() => {
    const usuarioAtual = localStorage.getItem("usuario");
    const aparencia =
      JSON.parse(localStorage.getItem(`aparencia_${usuarioAtual}`)) || {};

    return aparencia.fonte || "inter";
  });

  const [tamanhoFonte, setTamanhoFonte] = useState(() => {
    const usuarioAtual = localStorage.getItem("usuario");
    const aparencia =
      JSON.parse(localStorage.getItem(`aparencia_${usuarioAtual}`)) || {};

    return aparencia.tamanhoFonte || "normal";
  });

  const [empresa, setEmpresa] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("dadosEmpresa")) || {
        nome: "",
        cnpj: "",
        telefone: "",
        email: "",
        cidade: "",
        estado: "",
      }
    );
  });

  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [creditosAberto, setCreditosAberto] = useState(false);

  useEffect(() => {
    const usuarioAtual = localStorage.getItem("usuario");

    if (usuarioAtual) {
      localStorage.setItem(`tema_${usuarioAtual}`, tema);
    }

    document.documentElement.setAttribute("data-tema", tema);
  }, [tema]);

  useEffect(() => {
    aplicarAparencia(fonte, tamanhoFonte);
  }, [fonte, tamanhoFonte]);

  function aplicarAparencia(novaFonte, novoTamanho) {
    document.documentElement.setAttribute("data-fonte", novaFonte);
    document.documentElement.setAttribute("data-tamanho", novoTamanho);
  }

  function atualizarEmpresa(event) {
    const { name, value } = event.target;

    setEmpresa((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function salvarEmpresa(event) {
    event.preventDefault();

    localStorage.setItem("dadosEmpresa", JSON.stringify(empresa));

    toast.success("Dados da empresa salvos com sucesso!");
  }

  function salvarConta(event) {
    event.preventDefault();

    if (!senhaAtual) {
      toast.warning("Digite sua senha atual para continuar.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const indiceUsuario = usuarios.findIndex(
      (item) => item.usuario === localStorage.getItem("usuario"),
    );

    if (indiceUsuario === -1) {
      toast.error("Não foi possível encontrar sua conta.");
      return;
    }

    const contaAtual = usuarios[indiceUsuario];

    if (contaAtual.senha !== senhaAtual) {
      toast.error("A senha atual está incorreta.");
      return;
    }

    const usuarioExiste = usuarios.some(
      (item, indice) => indice !== indiceUsuario && item.usuario === usuario,
    );

    if (!usuario.trim()) {
      toast.warning("Digite um nome de usuário.");
      return;
    }

    if (usuarioExiste) {
      toast.warning("Esse nome de usuário já está em uso.");
      return;
    }

    if (novaSenha || confirmarSenha) {
      if (!novaSenha || !confirmarSenha) {
        toast.warning("Preencha os dois campos da nova senha.");
        return;
      }

      if (novaSenha !== confirmarSenha) {
        toast.error("As novas senhas não coincidem.");
        return;
      }

      if (novaSenha === senhaAtual) {
        toast.warning("A nova senha deve ser diferente da atual.");
        return;
      }

      contaAtual.senha = novaSenha;
    }

    contaAtual.usuario = usuario.trim();

    usuarios[indiceUsuario] = contaAtual;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuario", usuario.trim());

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");

    toast.success("Dados da conta atualizados com sucesso!");
  }

  function salvarAparencia() {
    const usuarioAtual = localStorage.getItem("usuario");

    const preferencias = {
      fonte,
      tamanhoFonte,
    };

    localStorage.setItem(
      `aparencia_${usuarioAtual}`,
      JSON.stringify(preferencias),
    );

    aplicarAparencia(fonte, tamanhoFonte);

    toast.success("Preferências de leitura salvas com sucesso!");
  }

  function restaurarPadrao() {
    const usuarioAtual = localStorage.getItem("usuario");

    setTema("claro");
    setFonte("inter");
    setTamanhoFonte("normal");

    localStorage.setItem(`tema_${usuarioAtual}`, "claro");

    localStorage.setItem(
      `aparencia_${usuarioAtual}`,
      JSON.stringify({
        fonte: "inter",
        tamanhoFonte: "normal",
      }),
    );

    aplicarAparencia("inter", "normal");

    toast.success("Configurações restauradas com sucesso!");
  }

  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1>Configurações</h1>
        <p>Gerencie os seus dados e personalize o TextilPro.</p>
      </header>
      <section className={styles.secao}>
        <div className={styles.tituloSecao}>
          <UserRound size={22} />

          <div>
            <h2>Minha conta</h2>
            <p>Atualize seu usuário e sua senha de acesso.</p>
          </div>
        </div>

        <form onSubmit={salvarConta}>
          <div className={styles.formulario}>
            <div className={styles.campo}>
              <label htmlFor="usuario">Nome de usuário</label>
              <input
                id="usuario"
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(event) =>
                  setUsuario(event.target.value.replace(/[^a-zA-ZÀ-ÿ]/g, ""))
                }
                required
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="senhaAtual">Senha atual</label>
              <input
                id="senhaAtual"
                type="password"
                placeholder="Digite sua senha atual"
                value={senhaAtual}
                onChange={(event) => setSenhaAtual(event.target.value)}
                maxLength={5}
                required
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="novaSenha">Nova senha</label>
              <input
                id="novaSenha"
                type="password"
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChange={(event) => setNovaSenha(event.target.value)}
                maxLength={5}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="confirmarSenha">Confirmar nova senha</label>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                maxLength={5}
              />
            </div>
          </div>

          <p className={styles.ajuda}>
            Para alterar seus dados, informe sua senha atual. Para manter a
            senha, deixe os campos de nova senha vazios.
          </p>

          <div className={styles.acoesFormulario}>
            <button type="submit" className={styles.botaoSalvar}>
              <ShieldCheck size={17} />
              Atualizar conta
            </button>
          </div>
        </form>
      </section>
      <section className={styles.secao}>
        <div className={styles.tituloSecao}>
          <Info size={22} />

          <div>
            <h2>Fonte e leitura</h2>
            <p>Personalize a aparência dos textos do sistema.</p>
          </div>
        </div>

        <div className={styles.opcoesLeitura}>
          <div className={styles.campoLeitura}>
            <h3>Tipo de fonte</h3>
            <p>Escolha uma fonte para facilitar sua leitura.</p>

            <select
              className={styles.seletor}
              value={fonte}
              onChange={(event) => setFonte(event.target.value)}
            >
              <option value="inter">Inter (Padrão)</option>
              <option value="atkinson">Atkinson Hyperlegible</option>
              <option value="lexend">Lexend</option>
            </select>
          </div>

          <div className={styles.campoLeitura}>
            <h3>Tamanho das letras</h3>
            <p>Ajuste o tamanho dos textos do sistema.</p>

            <select
              className={styles.seletor}
              value={tamanhoFonte}
              onChange={(event) => setTamanhoFonte(event.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="grande">Grande</option>
              <option value="muito-grande">Muito grande</option>
              <option value="extra-grande">Extra grande</option>
            </select>
          </div>
        </div>

        <div className={styles.acoesFormulario}>
          <button
            type="button"
            className={styles.botaoSalvar}
            onClick={salvarAparencia}
          >
            <Save size={17} />
            Salvar preferências
          </button>
        </div>
      </section>
      <section className={styles.secao}>
        <div className={styles.tituloSecao}>
          <Palette size={22} />

          <div>
            <h2>Aparência</h2>
            <p>Personalize as cores do sistema.</p>
          </div>
        </div>

        <div className={styles.opcao}>
          <div>
            <h3>Tema do sistema</h3>
            <p>Escolha entre o tema claro e o escuro.</p>
          </div>
          <div className={styles.botoesAcoes}>
            <div className={styles.botoesTema}>
              <button
                type="button"
                className={tema === "claro" ? styles.selecionado : ""}
                onClick={() => setTema("claro")}
              >
                <Sun size={18} />
                Claro
              </button>

              <button
                type="button"
                className={tema === "escuro" ? styles.selecionado : ""}
                onClick={() => setTema("escuro")}
              >
                <Moon size={18} />
                Escuro
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.tituloSecao}>
          <RotateCcw size={22} />

          <div>
            <h2>Preferências</h2>
            <p>Restaure as configurações de aparência.</p>
          </div>
        </div>

        <div className={styles.opcao}>
          <div>
            <h3>Restaurar configurações</h3>
            <p>Volte ao tema, fonte e tamanho padrão do sistema.</p>
          </div>
          <div className={styles.botoesAcoes}>
            <button
              type="button"
              className={styles.botaoRestaurar}
              onClick={restaurarPadrao}
            >
              <RotateCcw size={16} />
              Restaurar padrão
            </button>
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <div className={styles.tituloSecao}>
          <Info size={22} />

          <div>
            <h2>Sobre o TextilPro</h2>
            <p>Conheça mais sobre o sistema e sua equipe.</p>
          </div>
        </div>

        <div className={styles.opcao}>
          <div>
            <h3>TextilPro</h3>
            <p>Sistema de gerenciamento para negócios têxteis.</p>
            <span className={styles.versao}>Versão 1.0.0</span>
          </div>
          <div className={styles.botoesAcoes}>
            <button
              type="button"
              className={styles.botaoCreditos}
              onClick={() => setCreditosAberto(true)}
            >
              <CodeXml size={18} />
              Ver créditos
            </button>
          </div>
        </div>
      </section>

      <Creditos
        aberto={creditosAberto}
        fechar={() => setCreditosAberto(false)}
      />
    </main>
  );
}
