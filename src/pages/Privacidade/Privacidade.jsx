import { useNavigate } from "react-router";

import styles from "./Privacidade.module.css";

import logo from "../../assets/RenderTextilpro.png";

export function Privacidade() {
  const navigate = useNavigate();

  return (
    <div className={styles.privacidade}>
      <main className={styles.conteudo}>
        <header className={styles.cabecalho}>
          <img src={logo} alt="Logo do TextilPro" />

          <h1>Política de Privacidade</h1>

          <p>Entenda como o TextilPro utiliza e protege seus dados pessoais.</p>
        </header>

        <section className={styles.secao}>
          <h2>1. Sobre esta política</h2>

          <p>
            O TextilPro é um sistema desenvolvido para auxiliar no gerenciamento
            de uma confecção, facilitando o controle de vendas, estoque e
            pedidos.
          </p>

          <p>
            Esta política explica como os dados pessoais são tratados,
            considerando a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei
            nº 13.709/2018.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>2. Quais dados coletamos?</h2>

          <p>
            No cadastro, solicitamos apenas as informações necessárias para
            identificar o usuário e permitir o acesso ao sistema.
          </p>

          <ul>
            <li>Nome de usuário;</li>
            <li>Senha de acesso;</li>
            <li>Gênero informado no cadastro.</li>
          </ul>

          <p>
            Outras informações poderão ser tratadas durante o uso das
            funcionalidades, como dados de vendas, produtos e pedidos.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>3. Para que utilizamos os dados?</h2>

          <p>Os dados podem ser utilizados para:</p>

          <ul>
            <li>Criar e identificar sua conta;</li>
            <li>Permitir seu acesso ao TextilPro;</li>
            <li>Disponibilizar as funcionalidades do sistema;</li>
            <li>Manter a segurança e o funcionamento da aplicação;</li>
            <li>Cumprir obrigações legais, quando necessário.</li>
          </ul>
        </section>

        <section className={styles.secao}>
          <h2>4. Como protegemos seus dados?</h2>

          <p>
            Buscamos proteger as informações por meio de medidas de segurança
            adequadas, com o objetivo de evitar acessos não autorizados,
            alterações indevidas, perdas e outros incidentes.
          </p>

          <p>
            O acesso aos dados deve ser limitado às pessoas autorizadas,
            conforme suas responsabilidades.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>5. Compartilhamento de informações</h2>

          <p>
            Os dados não devem ser compartilhados indiscriminadamente. Quando
            necessário, o compartilhamento poderá ocorrer para o funcionamento
            do sistema ou para o cumprimento de obrigações legais, respeitando a
            legislação aplicável.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>6. Armazenamento e exclusão dos dados</h2>

          <p>
            Os dados serão armazenados pelo período necessário para atender às
            finalidades informadas, respeitando as obrigações legais e outras
            hipóteses de conservação previstas na legislação.
          </p>

          <p>
            Os usuários poderão solicitar informações sobre seus dados,
            correções e exclusões, conforme os direitos e as condições previstos
            na LGPD.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>7. Seus direitos</h2>

          <p>
            A LGPD garante aos titulares diferentes direitos relacionados aos
            seus dados pessoais, incluindo:
          </p>

          <ul>
            <li>Solicitar acesso aos dados pessoais;</li>
            <li>Corrigir informações incompletas ou desatualizadas;</li>
            <li>Solicitar a exclusão de dados nas hipóteses legais;</li>
            <li>Obter informações sobre o tratamento realizado;</li>
            <li>
              Revogar o consentimento, quando essa for a base legal utilizada.
            </li>
          </ul>
        </section>

        <section className={styles.secao}>
          <h2>8. Alterações nesta política</h2>

          <p>
            Esta política poderá ser atualizada para refletir mudanças no
            funcionamento do TextilPro ou nas práticas de tratamento de dados.
            Alterações relevantes deverão ser comunicadas de forma adequada.
          </p>
        </section>

        <section className={styles.secao}>
          <h2>9. Contato</h2>

          <p>
            Em caso de dúvidas ou solicitações relacionadas à privacidade, entre
            em contato pelo canal oficial que vier a ser disponibilizado pela
            equipe responsável pelo TextilPro.
          </p>
        </section>

        <footer className={styles.rodape}>
          <p>TextilPro — Gestão simples para sua confecção.</p>

          <p>Última atualização: outubro de 2026.</p>
        </footer>

        <button
          type="button"
          className={styles.botaoVoltar}
          onClick={() => navigate("/cadastro")}
        >
          Voltar para o cadastro
        </button>
      </main>
    </div>
  );
}
