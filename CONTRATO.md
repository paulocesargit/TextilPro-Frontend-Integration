# TextilPro — Checklist de integração Frontend e Backend

## 1. Configuração da API

- [ ] Padronizar os códigos HTTP de resposta.
- [ ] Definir o formato das mensagens de erro.
- [ ] Definir como será feita a autenticação.
- [ ] Definir o mecanismo de autenticação (JWT ou sessão).

**Frontend:** `src/services/api.js`

## 2. Autenticação e usuários

| Método | Endpoint sugerido    | Funcionalidade            |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/login`    | Realizar login            |
| POST   | `/api/auth/register` | Cadastrar usuário         |
| POST   | `/api/auth/logout`   | Encerrar sessão           |
| GET    | `/api/usuarios/me`   | Buscar usuário logado     |
| PATCH  | `/api/usuarios/me`   | Atualizar usuário e senha |

**Regras importantes:**

- [ ] Verificar se o usuário já existe.
- [ ] Criptografar as senhas no backend.
- [ ] Validar a senha atual antes de permitir alteração.
- [ ] Impedir acesso às páginas protegidas sem autenticação.
- [ ] Garantir que cada usuário acesse somente seus próprios dados.

## 3. Produtos e estoque

| Método | Endpoint sugerido    | Funcionalidade            |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/produtos`      | Listar produtos           |
| GET    | `/api/produtos/{id}` | Buscar produto específico |
| POST   | `/api/produtos`      | Cadastrar produto         |
| PATCH  | `/api/produtos/{id}` | Atualizar produto         |
| DELETE | `/api/produtos/{id}` | Excluir produto           |

**Regras importantes:**

- [ ] Controlar quantidade disponível.
- [ ] Identificar produtos com estoque baixo.
- [ ] Validar quantidades negativas.
- [ ] Atualizar estoque automaticamente após uma venda.
- [ ] Impedir vendas de quantidades superiores ao estoque disponível.

## 4. Vendas

| Método | Endpoint sugerido  | Funcionalidade          |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/vendas`      | Listar vendas           |
| GET    | `/api/vendas/{id}` | Buscar venda específica |
| POST   | `/api/vendas`      | Cadastrar venda         |
| PATCH  | `/api/vendas/{id}` | Atualizar venda         |
| DELETE | `/api/vendas/{id}` | Excluir venda           |

**Regras importantes:**

- [ ] Calcular o valor total da venda.
- [ ] Aplicar descontos corretamente.
- [ ] Registrar forma de pagamento.
- [ ] Controlar parcelas, quando aplicável.
- [ ] Registrar data da venda.
- [ ] Dar baixa no estoque automaticamente.
- [ ] Reverter a movimentação do estoque quando uma venda for cancelada ou excluída, conforme a regra definida.

**Atenção:** o cálculo financeiro e a atualização do estoque devem ser validados pelo backend, não apenas pelo React.

## 5. Pedidos

| Método | Endpoint sugerido   | Funcionalidade   |
| ------ | ------------------- | ---------------- |
| GET    | `/api/pedidos`      | Listar pedidos   |
| GET    | `/api/pedidos/{id}` | Buscar pedido    |
| POST   | `/api/pedidos`      | Cadastrar pedido |
| PATCH  | `/api/pedidos/{id}` | Atualizar pedido |
| DELETE | `/api/pedidos/{id}` | Excluir pedido   |

**Etapas dos pedidos:**

1. Recebido.
2. Em produção.
3. Em transporte.

**Regras importantes:**

- [ ] Controlar a mudança de etapas.
- [ ] Registrar data de criação.
- [ ] Relacionar pedido, cliente e produtos.
- [ ] Definir se o pedido será convertido em venda e em qual momento.
- [ ] Disponibilizar informações de acompanhamento.

## 6. Dashboard

| Método | Endpoint sugerido       | Funcionalidade     |
| ------ | ----------------------- | ------------------ |
| GET    | `/api/dashboard/resumo` | Buscar indicadores |

O endpoint deverá fornecer:

- [ ] Vendas do dia.
- [ ] Pedidos em andamento.
- [ ] Produtos com estoque baixo.
- [ ] Pedidos recebidos.
- [ ] Pedidos em produção.
- [ ] Pedidos em transporte.

**Exemplo de resposta esperada:**

```json
{
  "vendasDia": 2500.0,
  "pedidosEmAndamento": 15,
  "estoqueBaixo": 8,
  "pedidosRecebidos": 5,
  "pedidosEmProducao": 6,
  "pedidosEmTransporte": 4
}
```

## 7. Configurações

| Método | Endpoint sugerido  | Funcionalidade           |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/usuarios/me` | Buscar dados da conta    |
| PATCH  | `/api/usuarios/me` | Atualizar dados da conta |

As preferências de aparência não precisam de endpoints:

- [ ] Tema claro e escuro: LocalStorage.
- [ ] Fonte: LocalStorage.
- [ ] Tamanho da fonte: LocalStorage.

## 8. Banco de dados — PostgreSQL / Supabase

A equipe responsável pelo banco deverá garantir os relacionamentos necessários.

**Entidades principais sugeridas:**

- [ ] Usuários.
- [ ] Clientes.
- [ ] Produtos.
- [ ] Vendas.
- [ ] Itens da venda.
- [ ] Pedidos.
- [ ] Itens do pedido.
- [ ] Formas de pagamento ou pagamentos, conforme a modelagem escolhida.

**Pontos para definir:**

- [ ] Chaves primárias e estrangeiras.
- [ ] Relacionamentos entre tabelas.
- [ ] Campos obrigatórios.
- [ ] Tipos de dados.
- [ ] Restrições de integridade.
- [ ] Controle de estoque.
- [ ] Relacionamento dos dados com o usuário ou empresa responsável.
