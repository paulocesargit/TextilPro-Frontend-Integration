import { useEffect, useState } from "react";
import { formatarValor } from "../../utils/formatters";
import styles from "./Estoque.module.css";
import { toast } from "sonner";
import {
  listarProdutos,
  cadastrarProduto as cadastrarProdutoAPI,
  atualizarProduto as atualizarProdutoAPI,
  excluirProduto as excluirProdutoAPI,
} from "../../services/produtoService.js";

export function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await listarProdutos();

        if (!Array.isArray(resposta)) {
          throw new Error("A API não retornou uma lista de produtos.");
        }

        setProdutos(resposta);
      } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);

        toast.error("Não foi possível carregar os produtos.", {
          id: "erro-carregar-produtos",
        });
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  function limparFormulario() {
    setNome("");
    setCategoria("");
    setQuantidade("");
    setPreco("");
    setProdutoEditando(null);
    setFormularioAberto(false);
  }

  async function handleCadastrarProduto(event) {
    event.preventDefault();

    const novoProduto = {
      nome,
      categoria,
      quantidade: Number(quantidade),
      preco: Number(preco),
    };

    try {
      await cadastrarProdutoAPI(novoProduto);

      toast.success("Produto cadastrado com sucesso!");

      const resposta = await listarProdutos();
      setProdutos(resposta);

      limparFormulario();
    } catch (erro) {
      console.error("Erro ao cadastrar produto:", erro);

      toast.error("Não foi possível cadastrar o produto.");
    }
  }

  function editarProduto(produto) {
    setProdutoEditando(produto.id);
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setQuantidade(String(produto.quantidade));
    setPreco(String(produto.preco));
    setFormularioAberto(true);
  }

  async function handleSalvarProduto(event) {
    event.preventDefault();

    const dadosProduto = {
      nome,
      categoria,
      quantidade: Number(quantidade),
      preco: Number(preco),
    };

    try {
      await atualizarProdutoAPI(produtoEditando, dadosProduto);

      toast.success("Produto atualizado com sucesso!");

      const resposta = await listarProdutos();
      setProdutos(resposta);

      limparFormulario();
    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);

      toast.error("Não foi possível atualizar o produto.");
    }
  }

  async function handleExcluirProduto(id) {
    try {
      await excluirProdutoAPI(id);

      toast.success("Produto excluído com sucesso!");

      const resposta = await listarProdutos();
      setProdutos(resposta);
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);

      toast.error("Não foi possível excluir o produto.");
    }
  }

  const totalProdutos = produtos.length;

  const produtosDisponiveis = produtos.filter(
    (produto) => produto.quantidade > 5,
  ).length;

  const estoqueBaixo = produtos.filter(
    (produto) => produto.quantidade <= 5,
  ).length;

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      String(produto.id).includes(pesquisa),
  );

  return (
    <main className={styles.estoque}>
      <header className={styles.cabecalho}>
        <div>
          <h1>Estoque</h1>
          <p>Gerencie os produtos e acompanhe as quantidades disponíveis.</p>
        </div>

        <button
          type="button"
          className={styles.botaoAdicionar}
          onClick={() => {
            limparFormulario();
            setFormularioAberto(true);
          }}
        >
          + Novo produto
        </button>
      </header>

      {formularioAberto && (
        <section className={styles.formulario}>
          <h2>{produtoEditando ? "Editar produto" : "Cadastrar produto"}</h2>
          <form
            onSubmit={
              produtoEditando ? handleSalvarProduto : handleCadastrarProduto
            }
          >
            <div className={styles.camposFormulario}>
              <div className={styles.campo}>
                <label htmlFor="nome">Nome do produto</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="categoria">Categoria</label>
                <input
                  id="categoria"
                  type="text"
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  id="quantidade"
                  type="number"
                  min="0"
                  step="1"
                  value={quantidade}
                  onChange={(event) => setQuantidade(event.target.value)}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="preco">Preço (R$)</label>
                <input
                  id="preco"
                  type="number"
                  min="0"
                  max="99999999.99"
                  step="0.01"
                  value={preco}
                  onChange={(event) => {
                    if (event.target.value.length <= 10) {
                      setPreco(event.target.value);
                    }
                  }}
                  required
                />
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
                {produtoEditando ? "Salvar alterações" : "Cadastrar produto"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className={styles.resumo}>
        <article className={styles.card}>
          <span>Total de produtos</span>
          <strong>{totalProdutos}</strong>
        </article>

        <article className={styles.card}>
          <span>Disponíveis</span>
          <strong>{produtosDisponiveis}</strong>
        </article>

        <article className={styles.card}>
          <span>Estoque baixo</span>
          <strong>{estoqueBaixo}</strong>
        </article>
      </section>

      <section className={styles.conteudo}>
        <div className={styles.cabecalhoTabela}>
          <div>
            <h2>Produtos cadastrados</h2>
            <p>Confira as quantidades e os preços dos produtos.</p>
          </div>

          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={pesquisa}
            onChange={(event) => setPesquisa(event.target.value)}
            aria-label="Pesquisar produto"
          />
        </div>

        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.categoria}</td>
                  <td>{produto.quantidade} un.</td>

                  <td>{formatarValor(produto.preco)}</td>

                  <td>
                    <span
                      className={
                        produto.quantidade <= 5
                          ? styles.statusBaixo
                          : styles.statusDisponivel
                      }
                    >
                      {produto.quantidade <= 5 ? "Estoque baixo" : "Disponível"}
                    </span>
                  </td>

                  <td className={styles.acoesTabela}>
                    <button
                      type="button"
                      className={styles.botaoEditar}
                      onClick={() => editarProduto(produto)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className={styles.botaoExcluir}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Deseja realmente excluir este produto?",
                          )
                        ) {
                          handleExcluirProduto(produto.id);
                        }
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {!carregando && produtosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="6" className={styles.semResultados}>
                    Nenhum produto encontrado.
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
