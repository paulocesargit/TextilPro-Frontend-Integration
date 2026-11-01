import { apiGet, apiPost, apiPatch, apiDelete } from "./api.js";

export async function listarPedidos() {
  return await apiGet("/");
}

export async function cadastrarPedido(dados) {
  return await apiPost("/", dados);
}

export async function atualizarPedido(id, dados) {
  return await apiPatch(`/`, dados);
}

export async function excluirPedido(id) {
  return await apiDelete(`/`);
}
