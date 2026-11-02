import { apiPost } from "./api.js";

export async function fazerLogin(dados) {
  return await apiPost("/", dados);
}

export async function fazerCadastro(dados) {
  return await apiPost("/", dados);
}

export async function sairDaConta() {
  return await apiPost("/");
}
