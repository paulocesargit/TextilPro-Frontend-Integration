import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiGet(endpoint) {
  const resposta = await api.get(endpoint);

  return resposta.data;
}

export async function apiPost(endpoint, dados) {
  const resposta = await api.post(endpoint, dados);

  return resposta.data;
}

export async function apiPut(endpoint, dados) {
  const resposta = await api.put(endpoint, dados);

  return resposta.data;
}

export async function apiPatch(endpoint, dados) {
  const resposta = await api.patch(endpoint, dados);
  return resposta.data;
}

export async function apiDelete(endpoint) {
  const resposta = await api.delete(endpoint);

  return resposta.data;
}
