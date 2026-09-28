# Jogo da Velha em React

Este projeto foi desenvolvido como parte do meu aprendizado em React. O objetivo foi criar um jogo da velha interativo para praticar conceitos como estado, eventos e renderização condicional.

## Tecnologias Utilizadas

- React
- JavaScript
- CSS
- Vite (opcional, caso tenha sido usado para iniciar o projeto)

## Funcionalidades

- Tabuleiro dinâmico
- Alternância entre jogadores (X e O)
- Identificação do vencedor
- Reiniciar partida

## Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/ArthurAndrad3/JogoDaVelha-project
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd JogoDaVelha-project
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
5. Abra o navegador e acesse:
   ```
   http://localhost:5173
   ```

## Estrutura do Projeto

```
jogo-da-velha/
├── src/
│   ├── components/  # Componentes do jogo
│   ├── App.jsx      # Componente principal
│   ├── index.jsx     # Ponto de entrada do React
├── public/          # Arquivos estáticos
├── package.json     # Configuração do npm
├── vite.config.js   # Configuração do Vite (se aplicável)
└── README.md        # Este arquivo
```

## Licença

Este projeto foi criado para fins de aprendizado e não possui uma licença específica.

## Pipeline de CI/CD (GitHub Actions)

Definida em [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml). Roda em todo push e PR para `main`
(e manualmente via *Run workflow*). O deploy só acontece na `main`.

```
validate ─┐
          ├─► build ─► deploy-staging ─► deploy-production
sast ─────┘                (staging)       (production)
dependency-review (só em PR)
```

| Job | Tipo de verificação | Ferramentas |
| --- | --- | --- |
| `validate` | Estática + testes unitários | Gitleaks (segredos), `npm audit`, ESLint, Vitest + Testing Library (cobertura mínima de 80%) |
| `sast` | Estática (SAST) | CodeQL, com alertas na aba *Security* |
| `dependency-review` | Estática (PR) | Dependency Review: bloqueia dependência nova com CVE alta |
| `build` | Build + scan do artefato | Docker multi-stage, Trivy (CVE da imagem), publicação no GHCR com tag `sha-<commit>` |
| `deploy-staging` | Dinâmica | Sobe a imagem publicada, health check em `/health`, E2E com Playwright, DAST com OWASP ZAP |
| `deploy-production` | Promoção | Extrai os arquivos da **mesma imagem** validada em staging e publica no GitHub Pages |

### Ambientes

- **staging**: executa o contêiner publicado no registry dentro do runner (ambiente efêmero) e roda os testes dinâmicos contra ele.
- **production**: GitHub Pages. Sem aprovação manual: todo commit na `main` que passa por todas as barreiras vai
  para produção automaticamente (Continuous Deployment). Para virar Continuous Delivery, basta adicionar
  *required reviewers* em Settings → Environments → production.

O artefato é imutável: o código é compilado **uma única vez** no `build`. Staging e produção usam a mesma imagem,
identificada pelo SHA do commit.

### Rodando as verificações localmente

```sh
npm run lint
npm run test:coverage
npm run test:e2e          # sobe o preview do Vite automaticamente
docker build -t jogo-da-velha . && docker run -p 8080:8080 jogo-da-velha
```
