export function formatarValor(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarData(data) {
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}
