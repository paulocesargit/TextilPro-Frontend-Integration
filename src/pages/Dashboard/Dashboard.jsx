import { useEffect, useState } from "react";

import {
  ShoppingCart,
  ClipboardList,
  Package,
  Clock,
  Factory,
  Truck,
} from "lucide-react";

import { toast } from "sonner";
import { formatarValor } from "../../utils/formatters";
import {
  obterResumoDashboard,
  obterUsuario,
} from "../../services/dashboardService.js";

import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [usuario, setUsuario] = useState("");
  const [genero, setGenero] = useState("");

  const [resumo, setResumo] = useState({
    vendasDia: 0,
    pedidosEmAndamento: 0,
    estoqueBaixo: 0,
    pedidosRecebidos: 0,
    pedidosEmProducao: 0,
    pedidosEmTransporte: 0,
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarResumo() {
      try {
        const dadosUsuario = await obterUsuario();

        setUsuario(dadosUsuario.nome);
        setGenero(dadosUsuario.genero);

        const resposta = await obterResumoDashboard();

        setResumo({
          vendasDia: Number(resposta?.vendasDia) || 0,
          pedidosEmAndamento: Number(resposta?.pedidosEmAndamento) || 0,
          estoqueBaixo: Number(resposta?.estoqueBaixo) || 0,

          pedidosRecebidos: 0,
          pedidosEmProducao: 0,
          pedidosEmTransporte: 0,
        });
      } catch (erro) {
        console.error("Erro ao carregar o dashboard:", erro);

        toast.error("Não foi possível carregar os dados do dashboard.", {
          id: "erro-carregar-dashboard",
        });
      } finally {
        setCarregando(false);
      }
    }

    carregarResumo();
  }, []);

  const indicadores = [
    {
      titulo: "Vendas do dia",
      valor: formatarValor(resumo.vendasDia),
      descricao: "Total vendido hoje",
      icone: ShoppingCart,
    },
    {
      titulo: "Pedidos em andamento",
      valor: resumo.pedidosEmAndamento,
      descricao: "Pedidos em processamento",
      icone: ClipboardList,
    },
    {
      titulo: "Estoque baixo",
      valor: `${resumo.estoqueBaixo} itens`,
      descricao: "Produtos precisam de reposição",
      icone: Package,
    },
  ];

  const etapas = [
    {
      titulo: "Pedidos recebidos",
      valor: resumo.pedidosRecebidos,
      icone: Clock,
    },
    {
      titulo: "Em produção",
      valor: resumo.pedidosEmProducao,
      icone: Factory,
    },
    {
      titulo: "Em transporte",
      valor: resumo.pedidosEmTransporte,
      icone: Truck,
    },
  ];

  const totalPedidos = etapas.reduce((total, item) => total + item.valor, 0);

  return (
    <div className={styles.dashboard}>
      <header className={styles.cabecalho}>
        <div>
          <h1>
            Seja {genero === "Feminino" ? "bem-vinda" : "bem-vindo"}, {usuario}!
          </h1>

          <p>Confira o resumo e acompanhe as atividades da sua confecção.</p>
        </div>
      </header>

      <section className={styles.indicadores}>
        {indicadores.map((item) => {
          const Icone = item.icone;

          return (
            <article className={styles.card} key={item.titulo}>
              <div className={styles.cardTopo}>
                <span>{item.titulo}</span>

                <div className={styles.icone}>
                  <Icone size={22} />
                </div>
              </div>

              <h2>{carregando ? "..." : item.valor}</h2>

              <p>{item.descricao}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.pedidos}>
        <div className={styles.pedidosCabecalho}>
          <div>
            <h2>Acompanhamento dos pedidos</h2>
            <p>Veja em qual etapa estão os pedidos da confecção.</p>
          </div>

          <span className={styles.totalPedidos}>
            {carregando ? "..." : `${totalPedidos} pedidos`}
          </span>
        </div>

        <div className={styles.etapas}>
          {etapas.map((item) => {
            const Icone = item.icone;

            const porcentagem =
              totalPedidos > 0 ? (item.valor / totalPedidos) * 100 : 0;

            return (
              <article className={styles.etapa} key={item.titulo}>
                <div className={styles.etapaTopo}>
                  <div className={styles.etapaIcone}>
                    <Icone size={20} />
                  </div>

                  <strong>{carregando ? "..." : item.valor}</strong>
                </div>

                <h3>{item.titulo}</h3>

                <div className={styles.barraFundo}>
                  <div
                    className={styles.barraProgresso}
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>

                <span>
                  {carregando
                    ? "Carregando..."
                    : `${porcentagem.toFixed(0)}% dos pedidos`}
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
