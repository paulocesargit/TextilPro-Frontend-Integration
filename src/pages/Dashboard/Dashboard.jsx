import { useState } from "react";

import {
  ShoppingCart,
  ClipboardList,
  Package,
  Clock,
  Factory,
  Truck,
} from "lucide-react";

import styles from "./Dashboard.module.css";

const indicadores = [
  {
    titulo: "Vendas do dia",
    valor: "R$ 2.480,00",
    descricao: "Total vendido hoje",
    icone: ShoppingCart,
  },
  {
    titulo: "Pedidos em andamento",
    valor: "8",
    descricao: "Pedidos em processamento",
    icone: ClipboardList,
  },
  {
    titulo: "Estoque baixo",
    valor: "5 itens",
    descricao: "Produtos precisam de reposição",
    icone: Package,
  },
];

const etapas = [
  {
    titulo: "Pedidos recebidos",
    valor: 30,
    icone: Clock,
  },
  {
    titulo: "Em produção",
    valor: 15,
    icone: Factory,
  },
  {
    titulo: "Em transporte",
    valor: 18,
    icone: Truck,
  },
];

export function Dashboard() {
  const [usuario] = useState(localStorage.getItem("usuario") || "");
  const [genero] = useState(localStorage.getItem("genero") || "");

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

              <h2>{item.valor}</h2>

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

          <span className={styles.totalPedidos}>{totalPedidos} pedidos</span>
        </div>

        <div className={styles.etapas}>
          {etapas.map((item) => {
            const Icone = item.icone;

            const porcentagem = (item.valor / totalPedidos) * 100;

            return (
              <article className={styles.etapa} key={item.titulo}>
                <div className={styles.etapaTopo}>
                  <div className={styles.etapaIcone}>
                    <Icone size={20} />
                  </div>

                  <strong>{item.valor}</strong>
                </div>

                <h3>{item.titulo}</h3>

                <div className={styles.barraFundo}>
                  <div
                    className={styles.barraProgresso}
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>

                <span>{porcentagem.toFixed(0)}% dos pedidos</span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
