## Informações importantes
- **Variáveis de Ambiente:** O arquivo '.env' e 'services' foram incluídos no repositório excepcionalmente para facilitar o uso do Supabase e JWTSECRET. Tenho ciencia da devida importância de não enviar tais dados de extrema sensibilidade ao repositório, contudo, optei em seguir dessa forma para simplificar o acesso ao projeto. 
_Observação: RLS foi aplicado nas tabelas do Supabase para impedir deleções indevidas._

- **Banco de Dados:** O banco de dados utilizado é gerenciado pelo Supabase. Caso precise visualizar as tabelas e os dados, posso fornecer acesso ao projeto no Supabase. Dessa forma, poderá inspecionar todas as tabelas e suas estruturas diretamente.

- **Documentação no Código:** Todos os detalhes de como cada ação funciona estão devidamente documentados como comentários no código, facilitando o entendimento das operações.

- **Mobile First:** A aplicação foi desenvolvida seguindo uma abordagem *mobile first*, garantindo que a experiência do usuário seja otimizada para dispositivos móveis desde o início e seguindo com layout é responsivo, dessa forma, mantendo a experiência agradável em qualquer dispositivo. 
---
## Como rodar o projeto localmente

### Clone o repositório:

```bash
git clone https://github.com/iagoluancj/desafio-usina.git
cd desafio-usina
````
### Abra-o, navegue até `libraryfilmsbackend` e execute os comandos abaixo:
```bash
cd libraryfilmsbackend
yarn
yarn dev
````
### Com o backend em execução, navegue até `libraryfilmsfrontend` e execute os comandos abaixo:
```bash
cd ..
cd libraryfilmbackend
yarn
yarn dev
````
---
### Após seguir os passos acima, o projeto estará em execução e pronto para testes. 
Fico a disposição para demais dúvidas que precisarem ser respondidas diretamente.
