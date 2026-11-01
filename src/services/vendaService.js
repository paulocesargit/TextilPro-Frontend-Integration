import { apiGet, apiPost, apiPatch, apiDelete } from "./api.js";

export async function listarVendas() {
  return await apiGet("/");
}

export async function cadastrarVenda(dados) {
  return await apiPost("/", dados);
}

export async function atualizarVenda(id, dados) {
  return await apiPatch(`/`, dados);
}

export async function excluirVenda(id) {
  return await apiDelete(`/`);
}
