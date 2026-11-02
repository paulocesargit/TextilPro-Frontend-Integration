import { apiGet } from "./api.js";

export async function obterResumoDashboard() {
  return await apiGet("/");
}

export async function obterUsuario() {
  return await apiGet("/");
}
