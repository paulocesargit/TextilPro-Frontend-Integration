import { apiGet, apiPost, apiPatch, apiDelete } from "./api.js";

export async function listarProdutos() {
  return await apiGet("/");
}

export async function cadastrarProduto(dados) {
  return await apiPost("/", dados);
}

export async function atualizarProduto(id, dados) {
  return await apiPatch(`/`, dados);
}

export async function excluirProduto(id) {
  return await apiDelete(`/`);
}
