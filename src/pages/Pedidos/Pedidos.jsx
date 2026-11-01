import { useState } from "react";
import { formatarValor, formatarData } from "../../utils/formatters";
import styles from "./Pedidos.module.css";

const pedidosIniciais = [
  {
    id: 1001,
    cliente: "Maria Silva",
    data: "2026-10-15",
    valor: 149.9,
    status: "Pendente",
  },
  {
    id: 1002,
    cliente: "João Santos",
    data: "2026-10-15",
    valor: 289.9,
    status: "Em andamento",
  },
  {
    id: 1003,
    cliente: "Ana Oliveira",
    data: "2026-10-14",
    valor: 99.9,
    status: "Concluído",
  },
  {
    id: 1004,
    cliente: "Pedro Costa",
    data: "2026-10-14",
    valor: 219.9,
    status: "Pendente",
  },
];

export function Pedidos() {
  const [pedidos, setPedidos] = useState(pedidosIniciais);
  const [pesquisa, setPesquisa] = useState("");
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [pedidoEditando, setPedidoEditando] = useState(null);

  function limparFormulario() {
    setCliente("");
    setValor("");
    setStatus("Pendente");
    setPedidoEditando(null);
    setFormularioAberto(false);
  }

  function cadastrarPedido(event) {
    event.preventDefault();

    const novoPedido = {
      id: pedidos.length
        ? Math.max(...pedidos.map((pedido) => pedido.id)) + 1
        : 1001,
      cliente,
      data: new Date().toLocaleDateString("en-CA"),
      valor: Number(valor),
      status,
    };

    setPedidos([...pedidos, novoPedido]);
    limparFormulario();
  }

  function editarPedido(pedido) {
    setPedidoEditando(pedido.id);
    setCliente(pedido.cliente);
    setValor(String(pedido.valor));
    setStatus(pedido.status);
    setFormularioAberto(true);
  }

  function salvarPedido(event) {
    event.preventDefault();

    const pedidosAtualizados = pedidos.map((pedido) => {
      if (pedido.id === pedidoEditando) {
        return {
          ...pedido,
          cliente,
          valor: Number(valor),
          status,
        };
      }

      return pedido;
    });

    setPedidos(pedidosAtualizados);
    limparFormulario();
  }

  function excluirPedido(id) {
    const pedidosAtualizados = pedidos.filter((pedido) => pedido.id !== id);

    setPedidos(pedidosAtualizados);
  }

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.cliente.toLowerCase().includes(pesquisa.toLowerCase()) ||
      String(pedido.id).includes(pesquisa),
  );

  const pedidosPendentes = pedidos.filter(
    (pedido) => pedido.status === "Pendente",
  ).length;

  const pedidosEmAndamento = pedidos.filter(
    (pedido) => pedido.status === "Em andamento",
  ).length;

  const pedidosConcluidos = pedidos.filter(
    (pedido) => pedido.status === "Concluído",
  ).length;

  return (
    <main className={styles.pedidos}>
      <header className={styles.cabecalho}>
        <div>
          <h1>Pedidos</h1>
          <p>Acompanhe e gerencie os pedidos dos seus clientes.</p>
        </div>

        <button
          type="button"
          className={styles.botaoAdicionar}
          onClick={() => {
            limparFormulario();
            setFormularioAberto(true);
          }}
        >
          + Novo pedido
        </button>
      </header>

      {formularioAberto && (
        <section className={styles.formulario}>
          <h2>{pedidoEditando ? "Editar pedido" : "Cadastrar pedido"}</h2>

          <form onSubmit={pedidoEditando ? salvarPedido : cadastrarPedido}>
            <div className={styles.camposFormulario}>
              <div className={styles.campo}>
                <label htmlFor="cliente">Nome do cliente</label>
                <input
                  id="cliente"
                  type="text"
                  value={cliente}
                  onChange={(event) => setCliente(event.target.value)}
                  placeholder="Digite o nome do cliente"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="valor">Valor do pedido (R$)</label>
                <input
                  id="valor"
                  type="number"
                  min="0.01"
                  max="99999999.99"
                  step="0.01"
                  value={valor}
                  onChange={(event) => {
                    if (event.target.value.length <= 10) {
                      setValor(event.target.value);
                    }
                  }}
                  placeholder="0,00"
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="status">Situação</label>
                <select
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
            </div>

            <div className={styles.acoesFormulario}>
              <button
                type="button"
                className={styles.botaoCancelar}
                onClick={limparFormulario}
              >
                Cancelar
              </button>

              <button type="submit" className={styles.botaoAdicionar}>
                {pedidoEditando ? "Salvar alterações" : "Cadastrar pedido"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className={styles.resumo}>
        <article className={styles.card}>
          <span>Total de pedidos</span>
          <strong>{pedidos.length}</strong>
        </article>

        <article className={styles.card}>
          <span>Pendentes</span>
          <strong>{pedidosPendentes}</strong>
        </article>

        <article className={styles.card}>
          <span>Em andamento</span>
          <strong>{pedidosEmAndamento}</strong>
        </article>

        <article className={styles.card}>
          <span>Concluídos</span>
          <strong>{pedidosConcluidos}</strong>
        </article>
      </section>

      <section className={styles.conteudo}>
        <div className={styles.cabecalhoTabela}>
          <div>
            <h2>Lista de pedidos</h2>
            <p>Consulte os pedidos e acompanhe suas situações.</p>
          </div>

          <input
            type="text"
            placeholder="Buscar pedido ou cliente..."
            value={pesquisa}
            onChange={(event) => setPesquisa(event.target.value)}
            aria-label="Buscar pedido ou cliente"
          />
        </div>

        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td>#{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{formatarData(pedido.data)}</td>
                  <td>{formatarValor(pedido.valor)}</td>

                  <td>
                    <span
                      className={
                        pedido.status === "Concluído"
                          ? styles.statusConcluido
                          : pedido.status === "Em andamento"
                            ? styles.statusAndamento
                            : styles.statusPendente
                      }
                    >
                      {pedido.status}
                    </span>
                  </td>

                  <td className={styles.acoesTabela}>
                    <button
                      type="button"
                      className={styles.botaoEditar}
                      onClick={() => editarPedido(pedido)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className={styles.botaoExcluir}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja realmente excluir este pedido?",
                          )
                        ) {
                          excluirPedido(pedido.id);
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className={styles.semResultados}>
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
