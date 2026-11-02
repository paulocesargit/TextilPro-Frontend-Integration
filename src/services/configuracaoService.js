import { apiGet, apiPatch } from "./api.js";

export async function obterUsuario() {
  return await apiGet("/");
}

export async function atualizarConta(dados) {
  return await apiPatch("/", dados);
}
