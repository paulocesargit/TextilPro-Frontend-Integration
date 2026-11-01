import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatarValor } from "../../utils/formatters";
import { toast } from "sonner";
import {
  listarVendas,
  cadastrarVenda as cadastrarVendaAPI,
  atualizarVenda as atualizarVendaAPI,
  excluirVenda as excluirVendaAPI,
} from "../../services/vendaService.js";
import styles from "./Vendas.module.css";

export function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState("");
  const [desconto, setDesconto] = useState("0");
  const [pagamento, setPagamento] = useState("Pix");
  const [parcelas, setParcelas] = useState("1");
  const [status, setStatus] = useState("Pendente");
  const [vendaEditando, setVendaEditando] = useState(null);
  const [codigoPix, setCodigoPix] = useState("");

  useEffect(() => {
    async function carregarVendas() {
      try {
        const resposta = await listarVendas();

        setVendas(Array.isArray(resposta) ? resposta : []);
      } catch (erro) {
        console.log("Backend ainda não conectado.");
        setVendas([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarVendas();
  }, []);

  /* // Buscar vendas quando a página for aberta
useEffect(() => {
  async function carregarVendas() {
    try {
      const resposta = await listarVendas();

      setVendas(resposta);
    } catch (erro) {
      toast.error("Não foi possível carregar as vendas.");
    } finally {
      setCarregando(false);
    }
  }

  carregarVendas();
}, []);*/

  function limparFormulario() {
    setCliente("");
    setProduto("");
    setValor("");
    setDesconto("0");
    setPagamento("Pix");
    setParcelas("1");
    setStatus("Pendente");
    setVendaEditando(null);
    setCodigoPix("");
  }

  async function handleCadastrarVenda(event) {
    event.preventDefault();

    const dadosVenda = {
      cliente,
      produto,
      valor: Number(valor),
      desconto: Number(desconto),
      pagamento,
      parcelas: pagamento === "Cartão de crédito" ? Number(parcelas) : 1,
      status,
    };

    try {
      await cadastrarVendaAPI(dadosVenda);

      const resposta = await listarVendas();
      setVendas(resposta);

      toast.success("Venda cadastrada com sucesso!");

      limparFormulario();
    } catch (erro) {
      toast.error(
        erro.response?.data?.message || "Não foi possível cadastrar a venda.",
      );
    }
  }

  function editarVenda(venda) {
    setVendaEditando(venda.id);

    setCliente(venda.cliente);
    setProduto(venda.produto);
    setValor(String(venda.valor));
    setDesconto(String(venda.desconto || 0));
    setPagamento(venda.pagamento || "Pix");
    setParcelas(String(venda.parcelas || 1));
    setStatus(venda.status);

    setCodigoPix("");
  }

  async function handleSalvarVenda(event) {
    event.preventDefault();

    const dadosVenda = {
      cliente,
      produto,
      valor: Number(valor),
      desconto: Number(desconto),
      pagamento,
      parcelas: pagamento === "Cartão de crédito" ? Number(parcelas) : 1,
      status,
    };

    try {
      await atualizarVendaAPI(vendaEditando, dadosVenda);

      const resposta = await listarVendas();
      setVendas(resposta);

      toast.success("Venda atualizada com sucesso!");

      limparFormulario();
    } catch (erro) {
      toast.error(
        erro.response?.data?.message || "Não foi possível atualizar a venda.",
      );
    }
  }

  async function handleExcluirVenda(id) {
    const confirmar = window.confirm("Deseja realmente excluir esta venda?");

    if (!confirmar) {
      return;
    }

    try {
      await excluirVendaAPI(id);

      const resposta = await listarVendas();
      setVendas(resposta);

      if (vendaEditando === id) {
        limparFormulario();
      }

      toast.success("Venda excluída com sucesso!");
    } catch (erro) {
      toast.error(
        erro.response?.data?.message || "Não foi possível excluir a venda.",
      );
    }
  }

  function gerarCodigoPix() {
    if (codigoPix) {
      return;
    }

    if (!valor || Number(valor) <= 0) {
      toast.warning("Informe um valor válido para gerar o código Pix.");
      return;
    }

    const valorFinal = (Number(valor) - Number(desconto || 0)).toFixed(2);

    const codigo = `PIX-TEXTILPRO-${Date.now()}-VALOR-${valorFinal}`;

    setCodigoPix(codigo);
  }

  async function copiarCodigoPix() {
    try {
      await navigator.clipboard.writeText(codigoPix);
      toast.success("Código Pix copiado!");
    } catch {
      toast.error("Não foi possível copiar o código.");
    }
  }

  const totalVendido = vendas
    .filter((venda) => venda.status === "Concluída")
    .reduce((total, venda) => total + venda.valor - (venda.desconto || 0), 0);

  const vendasPendentes = vendas.filter(
    (venda) => venda.status === "Pendente",
  ).length;

  const valorFinal = Math.max(0, Number(valor || 0) - Number(desconto || 0));

  return (
    <div className={styles.vendas}>
      <div className={styles.vendasCabecalho}>
        <div>
          <h1>Controle de vendas</h1>
          <p>Consulte e registre as suas vendas.</p>
        </div>
      </div>

      <div className={styles.vendasResumo}>
        <div className={styles.vendasCard}>
          <p>Total vendido</p>
          <h2>{formatarValor(totalVendido)}</h2>
        </div>

        <div className={styles.vendasCard}>
          <p>Vendas registradas</p>
          <h2>{vendas.length}</h2>
        </div>

        <div className={styles.vendasCard}>
          <p>Vendas pendentes</p>
          <h2>{vendasPendentes}</h2>
        </div>
      </div>

      <div className={styles.vendasConteudo}>
        <h2>{vendaEditando ? "Editar venda" : "Registrar nova venda"}</h2>

        <form
          onSubmit={vendaEditando ? handleSalvarVenda : handleCadastrarVenda}
        >
          <div className={styles.vendasCampo}>
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
          <div className={styles.vendasCampo}>
            <label htmlFor="produto">Produto</label>
            <input
              id="produto"
              type="text"
              value={produto}
              onChange={(event) => setProduto(event.target.value)}
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div className={styles.vendasCampo}>
            <label htmlFor="valor">Valor da venda (R$)</label>
            <input
              id="valor"
              type="number"
              value={valor}
              onChange={(event) => {
                const novoValor = event.target.value;

                if (novoValor.length <= 10) {
                  setValor(novoValor);
                }
              }}
              placeholder="Ex.: 150"
              min="0.01"
              max="99999999.99"
              step="0.01"
              required
            />
          </div>

          <div className={styles.vendasCampo}>
            {" "}
            <label htmlFor="desconto">Desconto (R$)</label>{" "}
            <input
              id="desconto"
              type="number"
              value={desconto}
              onChange={(event) => {
                const novoDesconto = event.target.value;
                if (novoDesconto.length <= 10) {
                  setDesconto(novoDesconto);
                }
              }}
              min="0"
              max="99999999.99"
              step="0.01"
            />{" "}
          </div>
          <div className={styles.vendasCampo}>
            <label htmlFor="pagamento">Forma de pagamento</label>
            <select
              id="pagamento"
              value={pagamento}
              onChange={(event) => {
                setPagamento(event.target.value);
                setCodigoPix("");
              }}
            >
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          {pagamento === "Cartão de crédito" && (
            <div className={styles.vendasCampo}>
              <label htmlFor="parcelas">Parcelamento</label>
              <select
                id="parcelas"
                value={parcelas}
                onChange={(event) => setParcelas(event.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((quantidade) => (
                  <option key={quantidade} value={quantidade}>
                    {quantidade}x de {formatarValor(valorFinal / quantidade)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.vendasCampo}>
            <label htmlFor="status">Situação</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Pendente">Pendente</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          <div className={styles.vendasTotal}>
            <span>Valor final:</span>
            <strong>{formatarValor(valorFinal)}</strong>
          </div>
          <div className={styles.vendasAcoes}>
            {pagamento === "Pix" && (
              <button
                type="button"
                className={styles.vendasBotaoSecundario}
                onClick={gerarCodigoPix}
                disabled={Boolean(codigoPix)}
              >
                {codigoPix ? "Código Pix gerado" : "Gerar código Pix"}
              </button>
            )}

            {vendaEditando && (
              <button
                type="button"
                className={styles.vendasBotaoCancelar}
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}

            <button type="submit" className={styles.vendasBotao}>
              {vendaEditando ? "Salvar alterações" : "Cadastrar venda"}
            </button>
          </div>
          {pagamento === "Pix" && codigoPix && (
            <div className={styles.vendasPix}>
              <div className={styles.vendasCodigoPix}>
                <div className={styles.vendasQrCode}>
                  <QRCodeSVG
                    value={codigoPix}
                    size={200}
                    level="M"
                    includeMargin
                  />
                </div>

                <label htmlFor="codigoPix">Código gerado</label>
                <textarea id="codigoPix" value={codigoPix} readOnly rows="3" />

                <button
                  type="button"
                  className={styles.vendasBotaoSecundario}
                  onClick={copiarCodigoPix}
                >
                  Copiar código
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className={styles.vendasConteudo}>
        <h2>Vendas cadastradas</h2>

        <div className={styles.vendasTabela}>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor final</th>
                <th>Pagamento</th>
                <th>Parcelas</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>#{venda.id}</td>
                  <td>{venda.cliente}</td>
                  <td>{venda.produto}</td>
                  <td>{formatarValor(venda.valor - (venda.desconto || 0))}</td>
                  <td>{venda.pagamento || "Não informado"}</td>
                  <td>
                    {venda.pagamento === "Cartão de crédito"
                      ? `${venda.parcelas || 1}x`
                      : "-"}
                  </td>
                  <td>{venda.status}</td>
                  <td className={styles.vendasAcoesTabela}>
                    <button
                      type="button"
                      className={styles.vendasBotaoEditar}
                      onClick={() => editarVenda(venda)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className={styles.vendasBotaoExcluir}
                      onClick={() => handleExcluirVenda(venda.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {carregando ? (
                <tr>
                  <td colSpan="8" className={styles.semResultados}>
                    Carregando vendas...
                  </td>
                </tr>
              ) : vendas.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.semResultados}>
                    Nenhuma venda cadastrada.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
